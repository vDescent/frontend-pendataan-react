export default function validateAuth(formData, mode = "login") {
    const errors = {};

    // Email
    if (!formData.email) {
        errors.email = "Please fill this field properly";
    } else if (!/^[a-zA-Z0-9._%+-]+@(binus\.edu|binus\.ac\.id)$/.test(formData.email)) {
        errors.email = "Email must end with 'binus.edu' or 'binus.ac.id'";
    }

    // Password
    if (!formData.password) {
        errors.password = "Please fill this field properly";
    } else if (formData.password.length < 8) {
        errors.password = "Password must at least 8 letters";
    }

    // // Register only
    // if (mode === "register") {
    //     if (!formData.nama) {
    //         errors.nama = "Please fill this field properly";
    //     }
    // }

    return errors;
}
