module.exports.Renderhome = function( req , res ){
    return res.render( 'home' , {
        title: "Home" 
    }) ;
}