import React, { useState } from 'react';
import axios from 'axios';

const RegisterForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobile: '',
        gender: 'Select',
        dob: '',
        ticket_type: 'select',
        city: '',
        address: '',
        state: '',
        country: '',
        emergency_name: '',
        emergency_contact: '',
        blood_group: 'Select',
        coupon_code: '',
        ticket_amount: 0,
    });

    const [errors, setErrors] = useState({
        mobile: '',
        emergency_contact: '',
    });

    const [loading, setLoading] = useState(false);

    // Ticket Prices
    const ticketPrices = {
        'km': 0,
        '1km': 100,
        '2km': 150,
        '3km': 200,
        '5km': 300,
    };

    // Handle Input Changes
    const handleChange = (e) => {
        const { name, value } = e.target;

        // Mobile Number Validation
        if (name === 'mobile' || name === 'emergency_contact') {
            if (!/^\d{0,10}$/.test(value)) {
                return; // Prevent entering more than 10 digits
            }
        }

        setFormData((prev) => ({
            ...prev,
            [name]: value,
            ticket_amount: name === 'ticket_type' ? ticketPrices[value] : prev.ticket_amount,
        }));

        // Remove error if valid input
        if (name === 'mobile' && /^\d{10}$/.test(value)) {
            setErrors((prev) => ({ ...prev, mobile: '' }));
        }
        if (name === 'emergency_contact' && /^\d{10}$/.test(value)) {
            setErrors((prev) => ({ ...prev, emergency_contact: '' }));
        }
    };

    // Form Submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        let newErrors = {};
        if (!/^\d{10}$/.test(formData.mobile)) {
            newErrors.mobile = 'Mobile number must be 10 digits.';
        }
        if (!/^\d{10}$/.test(formData.emergency_contact)) {
            newErrors.emergency_contact = 'Emergency contact number must be 10 digits.';
        }

        // If errors exist, set errors and stop submission
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setLoading(true);

        try {
            const response = await axios.post('http://localhost:5000/registrations', formData);
            alert(response.data.message);
            setFormData({
                name: '', email: '', mobile: '', gender: 'Male', dob: '',
                ticket_type: '1km', city: '', address: '', state: '', country: '',
                emergency_name: '', emergency_contact: '', blood_group: 'A+',
                coupon_code: '', ticket_amount: 100,
            });
            setErrors({});
        } catch (error) {
            console.error('Error:', error);
            alert('Registration Failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-5xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-8">
            <h2 className="text-3xl font-bold text-center mb-6 text-blue-600">Marathon Registration</h2>
            <form onSubmit={handleSubmit} className="grid gap-4">

                {/* Name, Email, Mobile */}
                <h2>Name</h2>
                <input type="text" name="name" placeholder="Name" required className="border p-2 rounded-md" value={formData.name} onChange={handleChange} />
                <h2>Email</h2>
                <input type="email" name="email" placeholder="Email" required className="border p-2 rounded-md" value={formData.email} onChange={handleChange} />
                <h2>Mobile</h2>
                <input
                    type="tel"
                    name="mobile"
                    placeholder="Mobile Number"
                    required
                    className={`border p-2 rounded-md ${errors.mobile ? 'border-red-500' : ''}`}
                    value={formData.mobile}
                    onChange={handleChange}
                />
                {errors.mobile && <p className="text-red-500 text-sm">{errors.mobile}</p>}

                {/* Gender & DOB */}
                <h2>Gender</h2>
                    <select name="gender" className="border p-2 rounded-md w-full" value={formData.gender} onChange={handleChange}>
                        <option value="">Select
                        </option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
            

                    <h2>Date of Birth</h2>
                    <input type="date" name="dob" required className="border p-2 rounded-md w-full" value={formData.dob} onChange={handleChange} />
  

                {/* Ticket Type */}
                <h2>Ticket Type</h2>
                <select name="ticket_type" className="border p-2 rounded-md" value={formData.ticket_type} onChange={handleChange}>
                    {Object.keys(ticketPrices).map((type) => (
                        <option key={type} value={type}>{type}</option>
                    ))}
                </select>

                {/* Address Fields */}
                <h2>Address</h2>
                <input type="text" name="city" placeholder="City" required className="border p-2 rounded-md" value={formData.city} onChange={handleChange} />
                
                <input type="text" name="address" placeholder="Address" required className="border p-2 rounded-md" value={formData.address} onChange={handleChange} />
               
                    <input type="text" name="state" placeholder="State" required className="border p-2 rounded-md w-full" value={formData.state} onChange={handleChange} />
                    <input type="text" name="country" placeholder="Country" required className="border p-2 rounded-md w-full" value={formData.country} onChange={handleChange} />
           

                {/* Emergency Contact */}
                    <h2>Emergency Contact</h2>
                    <input type="text" name="emergency_name" placeholder="Emergency Contact Name" required className="border p-2 rounded-md w-full" value={formData.emergency_name} onChange={handleChange} />
                    <input
                        type="tel"
                        name="emergency_contact"
                        placeholder="Emergency Contact Number"
                        required
                        className={`border p-2 rounded-md w-full ${errors.emergency_contact ? 'border-red-500' : ''}`}
                        value={formData.emergency_contact}
                        onChange={handleChange}
                    />
                {errors.emergency_contact && <p className="text-red-500 text-sm">{errors.emergency_contact}</p>}

                {/* Blood Group & Coupon */}
                <h2>Blood Group</h2>
                    <select name="blood_group" className="border p-2 rounded-md w-full" value={formData.blood_group} onChange={handleChange}>
                        <option value="Select">Select</option>
                        <option value="A+">A+</option>
                        <option value="B+">B+</option>
                        <option value="O+">O+</option>
                        <option value="AB+">AB+</option>
                        <option value="A-">A-</option>
                        <option value="B-">B-</option>
                        <option value="O-">O-</option>
                        <option value="AB-">AB-</option>
                    </select>
                    <h2>Coupon Code</h2>
                    <input type="text" name="coupon_code" placeholder="Coupon Code (Optional)" className="border p-2 rounded-md w-full" value={formData.coupon_code} onChange={handleChange} />
       
                {/* Ticket Amount */}
                <h2>Ticket Amount</h2>
                <div className="border p-3 rounded-md text-center text-lg font-semibold bg-gray-100">
                    Ticket Amount: ₹{formData.ticket_amount}
                </div>

                {/* Submit Button */}
                

                <button type="submit" className="group relative block h-12 w-full rounded-md bg-gradient-to-br from-blue-500 to-blue-700 text-black font-bold shadow-lg transition hover:from-blue-700 hover:to-black hover:text-white">
                    {loading ? 'Registering...' : 'Register Now'}
                    <BottomGradient />
                </button>
            </form>
        </div>
    );
};
const BottomGradient = () => {
    return (
        <span className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />
    );
};

export default RegisterForm;
