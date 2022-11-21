/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";

const useAdmin = (email) => {
    const [isAdmin, setIsAdmin ] = useState(false);
    const [ adminLoading, setAdminLoading ] = useState(true);
    useEffect(() => {
        if (email) {
            fetch(`http://localhost:4000/user/admin/${email}`)
                .then(res => res.json())
                .then(data => {
                    if (data?.isAdmin) {
                        setIsAdmin(data?.isAdmin);
                    };
                    setAdminLoading(false);
                })
        }
    }, [email]);
    return [isAdmin, adminLoading];
};

export default useAdmin;