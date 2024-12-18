//authentication model



export function ensuresAuthenication(req, res, next){
    if (req.session.user){ // session.email or session.user or session.user.id
        // redirect logic goes here
        // where am i going /login or /dashboard
        req.flash("Welcome")
        res.redirect("/login")
    }
    

}

export function ensureGuest (req, res, next){
    if (!req.session.user){ // session.email or session.user or session.user.id
        // redirect logic goes here
        // where am i going /register or /dashboard
        req.flash("Please Sign In")
        res.redirect("/task-dashboard")
    }
}

export default {ensuresAuthenication, ensureGuest}
