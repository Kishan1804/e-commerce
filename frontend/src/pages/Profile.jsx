import React, { useEffect, useState } from 'react'
import axios from '../utils/axiosInstance'

const Profile = () => {
    const [userName, setUserName] = useState()
    const [email, setEmail] = useState()
    const [phone, setPhone] = useState()
    const [role, setRole] = useState()

    const fetchUser = async () => {
        try{
            const {data} = await axios.get('/profile')
            console.log(data.user)
            setUserName(data.user.fullName)
            setEmail(data.user.email)
            setPhone(data.user.number)
            setRole(data.user.role)
        }
        catch(err){
            console.log(err)
        }
    }

    useEffect(()=> {
        fetchUser()
    }, [])
    return (
        <>
            <div className="container light-style flex-grow-1 container-p-y">

                <h4 className="font-weight-bold py-3 mb-4">
                    Account settings
                </h4>

                <div className="card overflow-hidden">
                    <div className="row no-gutters row-bordered row-border-light">
                        <div className="col-md-3 pt-0">
                            <div className="list-group list-group-flush account-settings-links">
                                <a className="list-group-item list-group-item-action active" data-toggle="list" href="#account-general">General</a>
                                <a className="list-group-item list-group-item-action" data-toggle="list" href="#account-change-password">Change password</a>
                                <a className="list-group-item list-group-item-action" data-toggle="list" href="#account-info">Info</a>
                                <a className="list-group-item list-group-item-action" data-toggle="list" href="#account-social-links">Social links</a>
                                <a className="list-group-item list-group-item-action" data-toggle="list" href="#account-connections">Connections</a>
                                <a className="list-group-item list-group-item-action" data-toggle="list" href="#account-notifications">Notifications</a>
                            </div>
                        </div>
                        <div className="col-md-9">
                            <div className="tab-content">
                                <div className="tab-pane fade active show" id="account-general">
                                    
                                    <div className="card-body">
                                        <div className="form-group">
                                            <label className="form-label">Name</label>
                                            <input type="text" className="form-control" value={userName} onChange={(e) => setUserName(e.target.value)} />
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">Phone</label>
                                            <input type="text" className="form-control" value={phone} onChange={(e) => setPhone(e.target.value)} />
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">E-mail</label>
                                            <input type="text" className="form-control mb-1" value={email} disabled readOnly />
                                        </div>
                                        <div className='form-group'>
                                            <label className='form-label'>Role</label>
                                            <input type="text" className='form-control' value={role} disabled readOnly />
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="text-right mt-3">
                    <button type="button" className="btn btn-primary">Save changes</button>&nbsp;
                    <button type="button" className="btn btn-default">Cancel</button>
                </div>

            </div>
        </>
    )
}

export default Profile