import AppError from '../utils/error.utils.js';
import sendEmail from '../utils/sendEmail.js';
import userModel from '../models/user.model.js';

const contactUs = async (req, res, next) => {
    const { name, email, message} = req.body;

    if (!name || !email || !message) {
        return next(new AppError("All fields are required", 400));
    }

    try {
        const emailMessage = `Name: ${name}\nEmail: ${email}\nMessage: ${message}`;

        // Send email to the organization
        await sendEmail(
            process.env.CONTACT_US_EMAIL,
            "Contact Us",
            emailMessage,
        );

        // Send confirmation email to the user
        const userMessage = `Hello ${name},\n\nThank you for contacting us! We have received your message and will get in touch with you soon.\n\nBest regards,\nThe LMS Team 😊`;

        await sendEmail(
            email,
            'Thank You for Contacting Us',
            userMessage,
        );

        res.status(200).json({
            success: true,
            message: "Thanks for contacting. We have sent you a confirmation email and will get in touch with you soon.",
        });
    } catch (error) {
        return next(new AppError(error.message, 500));
    }
};


const stats = async (req, res, next) => {
    try {
        const allUsers = await userModel.find({});
        const allUsersCount = allUsers.length;
        const subscribedUsersCount = allUsers.filter((user) => user.subscription.status === 'active').length;
 
        res.status(200).json({
            success: true,
            message: 'stats',
            allUsersCount,
            subscribedUsersCount
        })
    } catch (e) {
        return next(new AppError(e.message, 500));
    }
}

export { contactUs, stats };
