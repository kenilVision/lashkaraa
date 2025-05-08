const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
    country: {
      type: String,
      required: true,
    },
    address1: {
      type: String,
      required: true,
    },
    address2: {
      type: String,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    pinCode: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
  }, { _id: false });


const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    fullname: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    address: {
        type: addressSchema,
        required: true,
      },
}, { timestamps: true });

userSchema.pre("save", function (next) {
    this.fullname = `${this.firstname} ${this.lastname}`;
    next();
});

userSchema.pre('findOneAndUpdate', async function (next) {
    const update = this.getUpdate();

    if (update.firstname || update.lastname) {
        const docToUpdate = await this.model.findOne(this.getQuery());

        const newFirstname = update.firstname || docToUpdate.firstname;
        const newLastname = update.lastname || docToUpdate.lastname;
        update.fullname = `${newFirstname} ${newLastname}`;

        this.setUpdate(update);
    }

    next();
});

module.exports = mongoose.model("User", userSchema);
