import LazyError from 'laziest-error'

const errors = new LazyError(Error);

errors.main_not_setted = new ReferenceError('main was not setted. .main must be called first')


export {errors}