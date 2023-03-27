import { VARIANTS } from "@/const/theme"

export default (ctx, inject) => {
    inject('theme', {
        variants: VARIANTS
    })
}