export const updateCompanyName = companyName => {
    return {
        type: "UPDATE_COMPANY_NAME",
        companyName
    };
};

export const updateEmail = email => {
    return {
        type: "UPDATE_EMAIL",
        email
    };
};