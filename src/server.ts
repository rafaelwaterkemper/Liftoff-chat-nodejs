import { init, http } from "./http"
import { init as wsinit } from "./websocket/client"

init().then(() => {
    http.listen(3333, () =>  { wsinit(); console.log("Subindo server")})
})