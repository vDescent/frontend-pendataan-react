export default function validateStaffForm(formData) {

    const errors = {};

    // Full Name
    if (!formData.fullName.trim()) {
        errors.fullName = "Please fill this field properly";
    } else if (!/^[A-Za-z\s]+$/.test(formData.fullName)) {
        errors.fullName = "Fullname must contain only letters";
    }

    // DOB
    if (!formData.dateOfBirth) {
        errors.dateOfBirth = "Please fill this field properly";
    }

  // PhoneNum
    if (!formData.phoneNumber) {
        errors.phoneNumber = "Please fill this field properly";
    } else if (!/^\d+$/.test(formData.phoneNumber)) {
        errors.phoneNumber = "Phone number must contain only numbers";
    } else if (formData.phoneNumber.length < 10) {
        errors.phoneNumber = "Phone number must be at least 10 digits";
    }

  // NIM
    if (!formData.nim) {
        errors.nim = "Please fill this field properly";
    } else if (!/^\d+$/.test(formData.nim)) {
        errors.nim = "NIM must contain only numbers";
    } else if (formData.nim.length !== 10) {
        errors.nim = "NIM must be 10 digits";
    }

  // BID
    if (!formData.binusianId) {
        errors.binusianId = "Please fill this field properly";
    } else if (!/^BN\d{9}$/.test(formData.binusianId)) {
        errors.binusianId = "BinusianID must start with 'BN' followed by exactly 9 digits (e.g. BN123456789)";
    }

    //email
    if (!formData.email) {
        errors.email = "Please fill this field properly";
    } else if (!/^[a-zA-Z0-9._%+-]+@(binus\.edu|binus\.ac\.id)$/.test(formData.email)) {
        errors.email = "Email must end with 'binus.edu' or 'binus.ac.id'";
    }

    //active smt
    if (!formData.activeSemester) {
        errors.activeSemester = "Please fill this field properly";
    } else if (!formData.activeSemester < 1 && formData.activeSemester > 14) {
        errors.activeSemester = "Active Semester must be between 1-14";
    }

    // Binusian Status
    if (!formData.binusianStatus) {
        errors.binusianStatus = "Please fill this field properly";
    }



  // Tambahkan validasi kolom lain nanti di sini...

  return errors;
}
