import { useQuery } from "@tanstack/react-query";
import { AuthContext } from '../Provider/AuthProvider';
import { useContext } from 'react';
import useAxiosSecure from "./useAxiosSecure";

const useInstructor = () => {
    const {user, loading} =useContext(AuthContext);
    const [axiosSecure] = useAxiosSecure();
    // use axios secure with react query

    const {data: isInstructor, isLoading: isInstructorLoading} = useQuery({
        queryKey: ['isInstructor', user?.email],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/instructor/${user?.email}`);
            return res.data.admin;
        }
    })
    return [isInstructor, isInstructorLoading]
}

export default useInstructor;