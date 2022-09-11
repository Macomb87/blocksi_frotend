import axios from 'axios';
import userStore from "@/store/module/user.store";

export function jwtInterceptor() {
    axios.interceptors.request.use(request => {
        if (userStore.state.token) {
            request.headers.common.Authorization = `Bearer ${userStore.state.token}`;
        }

        return request;
    });
}
