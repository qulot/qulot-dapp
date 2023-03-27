import Repositories from "../repositories"

export default (ctx, inject) => {
    inject('repositories', new Repositories(ctx.$axios))
}