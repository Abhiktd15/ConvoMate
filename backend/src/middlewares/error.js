const TryCatch = (parsedFunc) => async (req,res,next) => {
    try {
        await parsedFunc(req,res,next)
    } catch (error) {
        next(error)
    }
}

export {TryCatch}