import { useQuery } from '@tanstack/react-query'
import useAxiosSecure from './useAxiosSecure';
import { AuthContext } from '../Provider/AuthProvider';
import { useContext } from 'react';
const useCourse = () => {
    const { user, loading } = useContext(AuthContext);
    // const token = localStorage.getItem('access-token');
    const [axiosSecure] = useAxiosSecure();
    const { refetch, data: course = [] } = useQuery({
        queryKey: ['courses', user?.email],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure(`/courses?email=${user?.email}`)
            console.log('res from axios', res)
            return res.data;
        },
    })
    return [course,refetch]

}
export default useCourse;