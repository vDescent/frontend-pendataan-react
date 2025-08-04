export default function validateStaffForm(formData) {

    const errors = {};

    // contains only letters
    function validateLettersOnlyField(value, fieldName, fieldLabel) {
    if (!value.trim()) {
        return `${fieldLabel} is required.`;
    } else if (!/^[A-Za-z\s]+$/.test(value)) {
        return `${fieldLabel} must contain only letters`;
    }
    return null;
    }

    function validatePhoneNumber(value, fieldName, fieldLabel) {
    if (!value.trim()) {
        return `${fieldLabel} is required.`;
    } else if (!/^\d+$/.test(value)) {
        return `${fieldLabel} must contain only digits`;
    } else if (value.length < 10){
        return `${fieldLabel} must be at least 10 digits long`;
    }
    return null;
    }

    // Full Name
    const fullnameError = validateLettersOnlyField(formData.fullName, 'fullName', 'Full Name');
    if (fullnameError) errors.fullName = fullnameError;

    // DOB
    if (!formData.dateOfBirth) {
        errors.dateOfBirth = "Please fill this field properly";
    }

    const PhoneNumError = validatePhoneNumber(formData.phoneNumber, 'phoneNumber', 'Phone Number');
    if(PhoneNumError) errors.phoneNumber = PhoneNumError;

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

    // Start end date
    const start = new Date(formData.startDate);
    const end = new Date(formData.endDate);

    if (!formData.startDate) {
        errors.startDate = "Start date is required";
    }

    if (!formData.endDate) {
        errors.endDate = "End date is required";
    }

    // Hanya validasi jika keduanya sudah diisi
    if (formData.startDate && formData.endDate) {
        if (start >= end) {
            errors.startDate = "Start date must be before end date";
            errors.endDate = "End date must be after start date";
        }
    }

    // NIK
    if(formData.nik.length !== 16){
        errors.nik = "NIK must be 16 digit numbers"
    }

    // Domisili (address)
    const addressError = validateLettersOnlyField(formData.address, 'address', 'Address');
    if (addressError) errors.address = addressError;

    // NPWP
    if (!formData.npwp) {
        errors.npwp = "Please fill this field properly";
    } else if (!/^\d+$/.test(formData.npwp)) {
        errors.npwp = "NPWP must contain only numbers";
    } else if (formData.npwp.length !== 15) {
        errors.npwp = "NPWP must be 15 digits";
    }

    // BCA Account Number
    if (!formData.bankAccountNumber) {
        errors.bankAccountNumber = "Please fill this field properly";
    } else if (!/^\d+$/.test(formData.bankAccountNumber)) {
        errors.bankAccountNumber = "Bank Account Number must contain only numbers";
    } else if (formData.bankAccountNumber.length !== 10) {
        errors.bankAccountNumber = "Bank Account Number must be 15 digits";
    }

    const bankBranchError = validateLettersOnlyField(formData.bankBranch, 'bankBranch', 'Bank Branch');
    if (bankBranchError) errors.bankBranch = bankBranchError;

    const accountHolderError = validateLettersOnlyField(formData.accountHolderName, 'accountHolderName', 'Account Holder Name');
    if (accountHolderError) errors.accountHolderName = accountHolderError;

    const parentGuardianError = validateLettersOnlyField(formData.parentGuardianName, 'parentGuardianName', 'Parent Guardian Name');
    if (parentGuardianError) errors.parentGuardianName = parentGuardianError;

    const parentGuardianPhoneError = validatePhoneNumber(formData.parentGuardianPhone, 'parentGuardianPhone', 'Parents Guardian Phone Number');
    if(parentGuardianPhoneError) errors.parentGuardianPhone = parentGuardianPhoneError;

    const emergencyContactError = validatePhoneNumber(formData.emergencyContact, 'emergencyContact', 'Parents Guardian Phone Number');
    if(emergencyContactError) errors.emergencyContact = emergencyContactError;

    const emergencyRelationError = validateLettersOnlyField(formData.emergencyRelation, 'emergencyRelation', 'Parents Guardian Phone Number');
    if(emergencyRelationError) errors.emergencyRelation = emergencyRelationError;

  return errors;
}
