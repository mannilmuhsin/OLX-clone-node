import bcrypt from 'bcryptjs'
var salt=bcrypt.genSaltSync(10)

export const bcryptPassword=(password)=>{
   return bcrypt.hashSync(password, salt);
}

export const checkPassword=(password,checkPassword)=>{
    return bcrypt.compareSync(password,checkPassword);
}