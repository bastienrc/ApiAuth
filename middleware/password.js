const PasswordValidator = require('password-validator')

const passwordSchema = new PasswordValidator()

// Je définie mon schéma pour le mot de passe
passwordSchema
  .is().min(8)
  .is().max(64)
  .has().uppercase()
  .has().lowercase()
  .has().digits(2)
  .has().not().spaces()

// Get a full list of rules which failed
// console.log(passwordSchema.validate('joke', { list: true }))
// => [ 'min', 'uppercase', 'digits' ]

module.exports = (req, res, next) => {
  if (passwordSchema.validate(req.body.password)) {
    next()
  } else {
    return res
      .status(400)
      .json({
        error: `Le mot de passe n'est pas assez fort « ${passwordSchema.validate(req.body.password, { list: true })} »`
      })
  }
}
