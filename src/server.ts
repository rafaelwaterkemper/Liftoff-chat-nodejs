import { init, http } from "./http"
import { init as wsinit } from "./websocket/client"
import { init as adwsinit } from "./websocket/admin"

init().then(() => {
    http.listen(3333, () =>  { wsinit(); adwsinit(); console.log("Subindo server")})
})