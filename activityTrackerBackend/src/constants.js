export const accessCookieOptions = {
        maxAge: 1000 * 60 * 1440,
        httpOnly: true, 
        // signed: true,
        // secure:true
    }
export const refreshCookieOption = {
  maxAge:1000 * 60 * 1440 * 10,
  httpOnly:true,
  // secure:true
}

export const status=Object.freeze({
  START:"START",
  END:"END",
  PAUSE:"PAUSE",
  RESUME:"RESUME"
})
