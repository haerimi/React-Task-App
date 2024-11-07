import { useTypedSelecter } from "./redux"

export function useAuth() {
    const { id, email } = useTypedSelecter((state) => state.user);
    return {
        isAuth: !!email,
        email,
        id
    }
}