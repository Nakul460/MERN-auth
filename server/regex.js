const email = /\S+@\S+\.\S+/;

console.log(email.test("nakulraja33@gmail.com"));

    const password = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{6,}$/
    const passregex = /^(?=.*[0-9]).+/;
console.log(password.test("Nakul103"));
console.log(passregex.test("nakul123"));

const verifyOtpExpireAt = Date.now()+ 5* 60 * 1000 ;
console.log(verifyOtpExpireAt);


