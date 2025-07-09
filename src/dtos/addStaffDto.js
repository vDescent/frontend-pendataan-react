export function createAddStaffDto(formData) {
  return {
    fullName: formData.fullName || "",
    nim: formData.nim || "",
    binusianId: formData.binusianId || "",
    gender: formData.gender || "Male",
    email: formData.email || "",
    phoneNumber: formData.phoneNumber || "",
    activeSemester: Number(formData.activeSemester) || 1,
    binusianStatus: formData.binusianStatus || "",
    nik: formData.nik || "",
    dateOfBirth: formData.dateOfBirth || "",
    address: formData.address || "",
    npwp: formData.npwp || "",
    bankAccountNumber: formData.bankAccountNumber || "",
    bankBranch: formData.bankBranch || "",
    accountHolderName: formData.accountHolderName || "",
    parentGuardianName: formData.parentGuardianName || "",
    parentGuardianPhone: formData.parentGuardianPhone || "",
    emergencyContact: formData.emergencyContact || "",
    emergencyRelation: formData.emergencyRelation || "",
    startDate: formData.startDate || "",
    endDate: formData.endDate || ""
  };
}
