import { EndPoints } from "../settings/EndPoints";

export function fullMediaURL(url: string) : string {
    return `${EndPoints.serverURL}${url}`
}