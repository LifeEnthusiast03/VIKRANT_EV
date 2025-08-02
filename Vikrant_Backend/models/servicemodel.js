import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
  // User Information
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  customerName: {
    type: String,
    required: true,
    trim: true
  },
  customerEmail: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  customerPhone: {
    type: String,
    required: true,
    trim: true
  },
  
  // Bike Information (Simplified)
  bikeModel: {
    type: String,
    required: true,
    trim: true
  },
  serialNumber: {
    type: String,
    trim: true
  },
  
  // Service Details
  serviceType: {
    type: String,
    required: true,
    enum: [
      'bike_maintenance',    // Fixed typo
      'battery_service',
      'motor_repair',
      'brake_service',
      'tire_replacement',
      'electrical_check',
      'full_service',
      'custom_repair'
    ]
  },
  serviceMode: {
    type: String,
    required: true,
    enum: [
      'home_service',       // Made consistent with snake_case
      'showroom_service'
    ]
  },
  serviceDescription: {
    type: String,
    required: true,
    maxlength: 1000
  },
  urgency: {
    type: String,
    enum: ['low', 'medium', 'high', 'emergency'],
    default: 'medium'
  },
  
  // Scheduling
  preferredDate: {
    type: Date,
    required: true
  },
  
  // Service Status
  status: {
    type: String,
    enum: [
      'pending',           // Just submitted
      'confirmed',         // Admin confirmed the booking
      'in_progress',       // Service is being performed
      'waiting_parts',     // Waiting for parts/components
      'ready_pickup',      // Service completed, ready for pickup
      'completed',         // Service completed and bike picked up
      'cancelled',         // Service cancelled
      'rejected'           // Admin rejected the request
    ],
    default: 'pending'
  },
  
  // Admin Management
  adminNotes: {
    type: String,
    maxlength: 2000
  },
  estimatedCost: {
    type: Number,
    min: 0
  },
  estimatedCompletionDate: {
    type: Date
  },
  assignedTechnician: {
    type: String,
    trim: true
  },
  
  // Service History/Updates (Recommended to keep)
  serviceUpdates: [{
    updateDate: {
      type: Date,
      default: Date.now
    },
    updateBy: {
      type: String,
      enum: ['admin', 'technician', 'system'],
      required: true
    },
    updateMessage: {
      type: String,
      required: true,
      maxlength: 500
    },
    newStatus: {
      type: String,
      enum: [
        'pending', 'confirmed', 'in_progress', 'waiting_parts',
        'ready_pickup', 'completed', 'cancelled', 'rejected'
      ]
    }
  }],
  
  // Payment Information
  paymentStatus: {
    type: String,
    enum: ['pending', 'partial', 'paid', 'refunded'],
    default: 'pending'
  },
  paymentMethod: {
    type: String,
    enum: ['cash', 'card', 'online', 'bank_transfer']
  },
  
  // Address (for home service)
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for better query performance
serviceSchema.index({ userId: 1, createdAt: -1 });
serviceSchema.index({ status: 1, createdAt: -1 });
serviceSchema.index({ customerEmail: 1 });
serviceSchema.index({ preferredDate: 1 });
serviceSchema.index({ serviceMode: 1 });

// Virtual for service duration
serviceSchema.virtual('serviceDuration').get(function() {
  if (this.status === 'completed' && this.updatedAt) {
    return Math.ceil((this.updatedAt - this.createdAt) / (1000 * 60 * 60 * 24)); // days
  }
  return null;
});

// Method to add service update
serviceSchema.methods.addUpdate = function(updateBy, message, newStatus = null) {
  this.serviceUpdates.push({
    updateBy,
    updateMessage: message,
    newStatus: newStatus || this.status
  });
  
  if (newStatus) {
    this.status = newStatus;
  }
  
  return this.save();
};

// Static method to get services by status
serviceSchema.statics.getByStatus = function(status) {
  return this.find({ status }).populate('userId', 'name email').sort({ createdAt: -1 });
};

// Static method to get user services
serviceSchema.statics.getUserServices = function(userId) {
  return this.find({ userId }).sort({ createdAt: -1 });
};

export default mongoose.model("Service", serviceSchema);