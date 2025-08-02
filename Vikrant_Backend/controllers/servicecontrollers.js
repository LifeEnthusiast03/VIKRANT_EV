import Service from "../models/servicemodel.js";

// Book a service
const bookookService = async (req, res) => {
  try {
    const userId = req.user._id;
    
    const {
      customerName,
      customerEmail,
      customerPhone,
      bikeModel,
      serialNumber,
      serviceType,
      serviceMode,
      serviceDescription,
      urgency,
      preferredDate,
      address
    } = req.body;

    // Validation
    if (!customerName || !customerEmail || !customerPhone || !bikeModel || 
        !serviceType || !serviceMode || !serviceDescription || !preferredDate) {
      return res.status(400).json({
        success: false,
        message: 'All required fields must be provided'
      });
    }

    // Validate service type
    const validServiceTypes = [
      'bike_maintenance', 'battery_service', 'motor_repair', 'brake_service',
      'tire_replacement', 'electrical_check', 'full_service', 'custom_repair'
    ];
    if (!validServiceTypes.includes(serviceType)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid service type'
      });
    }

    // Validate service mode
    if (!['home_service', 'showroom_service'].includes(serviceMode)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid service mode'
      });
    }

    // Validate date is in future
    const selectedDate = new Date(preferredDate);
    if (selectedDate <= new Date()) {
      return res.status(400).json({
        success: false,
        message: 'Preferred date must be in the future'
      });
    }

    // If home service, address is required
    if (serviceMode === 'home_service' && !address) {
      return res.status(400).json({
        success: false,
        message: 'Address is required for home service'
      });
    }

    // Create service booking
    const serviceData = {
      userId,
      customerName: customerName.trim(),
      customerEmail: customerEmail.trim().toLowerCase(),
      customerPhone: customerPhone.trim(),
      bikeModel: bikeModel.trim(),
      serialNumber: serialNumber?.trim(),
      serviceType,
      serviceMode,
      serviceDescription: serviceDescription.trim(),
      urgency: urgency || 'medium',
      preferredDate: selectedDate,
      status: 'pending'
    };

    // Add address if home service
    if (serviceMode === 'home_service' && address) {
      serviceData.address = {
        street: address.street?.trim(),
        city: address.city?.trim(),
        state: address.state?.trim(),
        zipCode: address.zipCode?.trim()
      };
    }

    const newService = new Service(serviceData);
    
    // Add initial service update
    await newService.addUpdate('system', 'Service booking created successfully', 'pending');
    
    await newService.save();

    // Populate user data for response
    await newService.populate('userId', 'name email');

    res.status(201).json({
      success: true,
      message: 'Service booked successfully',
      data: {
        serviceId: newService._id,
        status: newService.status,
        preferredDate: newService.preferredDate,
        serviceType: newService.serviceType,
        serviceMode: newService.serviceMode,
        estimatedCost: newService.estimatedCost || 'To be determined',
        createdAt: newService.createdAt
      }
    });

  } catch (error) {
    console.error('Error booking service:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to book service. Please try again.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Get all services for a user
const getAllServicde = async (req, res) => {
  try {
    const userId = req.user._id;
    const { status, page = 1, limit = 10, sortBy = 'createdAt', sortOrder = 'desc' } = req.body;

    // Build query
    const query = { userId };
    if (status) {
      const validStatuses = [
        'pending', 'confirmed', 'in_progress', 'waiting_parts',
        'ready_pickup', 'completed', 'cancelled', 'rejected'
      ];
      if (validStatuses.includes(status)) {
        query.status = status;
      }
    }

    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const sortOptions = {};
    sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;

    // Get services with pagination
    const services = await Service.find(query)
      .populate('userId', 'name email')
      .sort(sortOptions)
      .skip(skip)
      .limit(parseInt(limit))
      .lean();

    // Get total count for pagination info
    const totalServices = await Service.countDocuments(query);
    const totalPages = Math.ceil(totalServices / parseInt(limit));

    // Format response data
    const formattedServices = services.map(service => ({
      id: service._id,
      customerName: service.customerName,
      bikeModel: service.bikeModel,
      serviceType: service.serviceType,
      serviceMode: service.serviceMode,
      status: service.status,
      urgency: service.urgency,
      preferredDate: service.preferredDate,
      estimatedCost: service.estimatedCost,
      estimatedCompletionDate: service.estimatedCompletionDate,
      assignedTechnician: service.assignedTechnician,
      paymentStatus: service.paymentStatus,
      createdAt: service.createdAt,
      updatedAt: service.updatedAt,
      serviceDuration: service.serviceDuration,
      lastUpdate: service.serviceUpdates?.length > 0 
        ? service.serviceUpdates[service.serviceUpdates.length - 1]
        : null
    }));

    // Get status summary
    const statusSummary = await Service.aggregate([
      { $match: { userId } },
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);

    const statusCounts = statusSummary.reduce((acc, item) => {
      acc[item._id] = item.count;
      return acc;
    }, {});

    res.status(200).json({
      success: true,
      message: 'Services retrieved successfully',
      data: {
        services: formattedServices,
        pagination: {
          currentPage: parseInt(page),
          totalPages,
          totalServices,
          hasNextPage: parseInt(page) < totalPages,
          hasPrevPage: parseInt(page) > 1
        },
        statusSummary: statusCounts
      }
    });

  } catch (error) {
    console.error('Error fetching services:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve services. Please try again.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Get the status of a particular service
const getSericeStatus = async (req, res) => {
  try {
    const userId = req.user._id;
    const { serviceId } = req.body;

    if (!serviceId) {
      return res.status(400).json({
        success: false,
        message: 'Service ID is required'
      });
    }

    // Find service and ensure it belongs to the user
    const service = await Service.findOne({ 
      _id: serviceId, 
      userId 
    }).populate('userId', 'name email');

    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service not found or you do not have permission to view it'
      });
    }

    // Format detailed service information
    const serviceDetails = {
      id: service._id,
      
      // Customer & Bike Info
      customerName: service.customerName,
      customerEmail: service.customerEmail,
      customerPhone: service.customerPhone,
      bikeModel: service.bikeModel,
      serialNumber: service.serialNumber,
      
      // Service Details
      serviceType: service.serviceType,
      serviceMode: service.serviceMode,
      serviceDescription: service.serviceDescription,
      urgency: service.urgency,
      
      // Status & Scheduling
      status: service.status,
      preferredDate: service.preferredDate,
      estimatedCompletionDate: service.estimatedCompletionDate,
      
      // Service Management
      assignedTechnician: service.assignedTechnician,
      adminNotes: service.adminNotes,
      estimatedCost: service.estimatedCost,
      
      // Payment Info
      paymentStatus: service.paymentStatus,
      paymentMethod: service.paymentMethod,
      
      // Address (if home service)
      address: service.address,
      
      // Timestamps
      createdAt: service.createdAt,
      updatedAt: service.updatedAt,
      serviceDuration: service.serviceDuration,
      
      // Service Updates History
      serviceUpdates: service.serviceUpdates.map(update => ({
        date: update.updateDate,
        updatedBy: update.updateBy,
        message: update.updateMessage,
        status: update.newStatus
      })).sort((a, b) => new Date(b.date) - new Date(a.date))
    };

    // Add status-specific information
    let statusMessage = '';
    switch (service.status) {
      case 'pending':
        statusMessage = 'Your service request is pending review by our team.';
        break;
      case 'confirmed':
        statusMessage = 'Your service has been confirmed and scheduled.';
        break;
      case 'in_progress':
        statusMessage = 'Your bike is currently being serviced.';
        break;
      case 'waiting_parts':
        statusMessage = 'Service is on hold while we wait for required parts.';
        break;
      case 'ready_pickup':
        statusMessage = 'Your bike is ready for pickup!';
        break;
      case 'completed':
        statusMessage = 'Service completed successfully.';
        break;
      case 'cancelled':
        statusMessage = 'This service request has been cancelled.';
        break;
      case 'rejected':
        statusMessage = 'This service request was rejected.';
        break;
      default:
        statusMessage = 'Status unknown.';
    }

    res.status(200).json({
      success: true,
      message: 'Service status retrieved successfully',
      data: {
        service: serviceDetails,
        statusMessage,
        canCancel: ['pending', 'confirmed'].includes(service.status),
        nextActions: getNextActions(service.status)
      }
    });

  } catch (error) {
    console.error('Error fetching service status:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve service status. Please try again.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Helper function to determine next actions based on status
const getNextActions = (status) => {
  const actions = {
    pending: ['Wait for confirmation', 'Cancel if needed'],
    confirmed: ['Prepare your bike', 'Cancel if needed'],
    in_progress: ['Wait for completion updates'],
    waiting_parts: ['Wait for parts to arrive'],
    ready_pickup: ['Schedule pickup', 'Arrange payment if due'],
    completed: ['Leave feedback', 'Book next service'],
    cancelled: ['Book new service if needed'],
    rejected: ['Contact support', 'Book alternative service']
  };
  
  return actions[status] || [];
};

export { bookookService, getAllServicde, getSericeStatus };