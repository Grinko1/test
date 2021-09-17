import axios from 'axios';
import React, { useEffect, useState } from 'react';
import s from './Github.module.css'


type SearchUserType={
    login : string
    id:number
}
type SearchResult = {
    items:SearchUserType[]
}
type UserType= {
    login: string
    id: number
    avatar_url: string
    followers: number
}

type SearchPropsType = {
    value: string
    onSubmit:(fixedValue:string) => void

}
export const Search = (props:SearchPropsType) => {
    const [tempSearch, setTempSearch] = useState('')
    useEffect(()=>{
        setTempSearch(props.value)
    },[props.value])
    return(
        <div>
        <input value={tempSearch} 
        placeholder='search'
        onChange={(e) => {setTempSearch(e.currentTarget.value)}}
        /> <button onClick={()=>{
            props.onSubmit(tempSearch)
        }} >find</button>
    </div>
    )
}


type UsersListPropsType={
    term:string
    selectedUser: SearchUserType | null
    onUserSelect: (user:SearchUserType ) => void
}
export const UsersList = (props: UsersListPropsType) =>{
    const [users, setUsers] = useState<SearchUserType[]>([])

    useEffect(()=>{
        console.log('sync users all')
        axios.get<SearchResult>(`https://api.github.com/search/users?q=${props.term}`)
        .then(res =>
            { setUsers(res.data.items)})
    }, [props.term])
    return(
        <div>
                <ul>
                {users.map(u => <li key={u.id}
                            className={props.selectedUser === u ? s.selected :''} 
                            onClick={()=>{
                                    props.onUserSelect(u)
                                    }}>
                                    {u.login}
                                    </li>)}
            </ul>
        </div>
    )
}

type TimerProps={
    seconds: number
    onChange:(actualSeconds:number)=>void
    timerKey:string | number
}
export const Timer = (props:TimerProps) => {
    const [seconds, setSeconds] = useState(props.seconds)


    useEffect(()=>{
        setSeconds(props.seconds)
    },[props.seconds])


    useEffect(()=>{
        props.onChange(seconds)
    },[seconds])

   

    useEffect(()=>{
        const intervalId = setInterval(()=>{
            console.log('tick')
            setSeconds((prev)=> prev - 1)}, 1000)
            return () =>{clearInterval(intervalId)}
       
    },[props.timerKey])

    return(
        <>
        <div>{seconds}</div>
        </>
    )
}
 
type UserDetailsPropsType={
    user: SearchUserType | null
}
const startTimerSeconds = 10
export const UserDetails = (props:UserDetailsPropsType) => {
    const [seconds, setSeconds] = useState(startTimerSeconds)
    const [userDetails, setUserDetails] = useState<null | UserType>(null)

    useEffect(()=>{
        console.log('sync user details')
     if(!!props.user){
            axios.get<UserType>(`https://api.github.com/users/${props.user.login}`)
        .then(res =>
            { 
                setSeconds(startTimerSeconds)
                setUserDetails(res.data)
            
            })
        }
    }, [props.user])

    useEffect(()=>{
        if(seconds < 1){
            setUserDetails(null)
        }
    },[seconds])

    return (
        <>
           <div> 
                

              {userDetails &&  <div>
                <Timer seconds={seconds} onChange={setSeconds} timerKey={userDetails.id} />
                <h2>{userDetails.login}</h2>
                  <img  src={userDetails.avatar_url} alt={'No avatar'}/>
                  <br/>
                 name: {userDetails.login}, followers: {userDetails.followers}
                  </div>}
            </div>
        </>
    )
}

const Github = () => {

    let initialSearchState = 'it-kamasutra'

    const [selectedUser, setSelectedUser] = useState<SearchUserType | null>(null)
    // const [users, setUsers] = useState<SearchUserType[]>([])
    // const [tempSearch, setTempSearch] = useState('it-kamasutra')
    const [searchTerm, setSearchTerm] = useState(initialSearchState)
    // const [userDetails, setUserDetails] = useState<null | UserType>(null)



    useEffect(()=>{
        console.log('sync title')
        if(selectedUser) {
            document.title = selectedUser.login
        }
    },[selectedUser])



 

    return (
        <div className={s.container}>
            
            <Search value={searchTerm} onSubmit={(value:string)=>{ setSearchTerm(value)}} />
            <button onClick={()=> setSearchTerm(initialSearchState)}>reset</button>
           
            <div>
                <UsersList onUserSelect={setSelectedUser} selectedUser={selectedUser} term={searchTerm}/>
           
            </div>
           
            
            <UserDetails user={selectedUser}/>
         
        </div>
    );
};

export default Github;