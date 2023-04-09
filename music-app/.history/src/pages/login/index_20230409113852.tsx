import { useSession, signIn, signOut, getProviders, ClientSafeProvider, getSession } from "next-auth/react"
import { AiOutlineLock } from "react-icons/ai"
import { HiOutlineMail } from "react-icons/hi"
import { FcGoogle } from "react-icons/fc"
import { FiUser } from "react-icons/fi"
import Image from 'next/image'
import headphone from '../../static/headphone.jpg'
import Input from "../../components/elements/Form/Input"
import { FormEventHandler, useCallback, useEffect, useState } from "react"
import axios, { AxiosResponse } from "axios"
import { useRouter } from "next/router"
import { pathToFileURL } from "url"



export default function Component() {
    const router = useRouter();
    const [user, setUser] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cfpassword, setCfpassword] = useState('');
    const [checkErrorLogin, setCheckErrorLogin] = useState('');
    const [showpw, setShowpw] = useState(false);
    const [showCpw, setShowCpw] = useState(false);

    const [variant, setVariant] = useState('login');

    var toggleVariant = useCallback(() => {
        setVariant((currentVariant) => currentVariant === 'login' ? 'register' : 'login');
    }, []);

    const hanldeSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();

        if (variant === 'login') {
            try {
                await signIn('credentials', {
                    email,
                    password,
                    redirect: true,
                    callbackUrl: '/Form',
                });
                // router.push('/user');
            }
            catch (error: any) {
                setCheckErrorLogin(error.message);
                console.log(error)
            }
        }
        else {
            try {
                const tempVariant: AxiosResponse = await axios.post('/api/register', {
                    email,
                    user,
                    password,
                    cfpassword,
                });
                setVariant('login');
            } catch (error: any) {
                // setCheckError(true);
                // console.log(error);
                console.log(error.message);
            }
        }
    }
    const handlingLogin = useCallback(async () => {
        try {
            await signIn('credentials', {
                email,
                password,
                redirect: false,
                callbackUrl: '/user',
            });
        }
        catch (error) {
            console.log(error)
        }
    }, [email,
        password,
        router])
    const handleSignInGG = () => {
        signIn('google', { callbackUrl: '/Form' });
    }

    const handleRegister = useCallback(async () => {
        try {
            await axios.post('/api/register', {
                email,
                user,
                password,
                cfpassword,
            });
        } catch (error) {
            console.log(error);
        }
    }, [email,
        user,
        password,
        cfpassword,]);

    return (
        <div className='flex items-center justify-center h-screen cursor-pointer'>
            <div className="bg-[#EEEEEE] rounded-2xl w-fit border-[1px] border-[#E2E2E2]">
                <div className="p-2">
                    <div className=" p-1 ml-2">
                        <p className="text-[#00ADB5] text-2xl font-bold">Explore</p>
                        <p className="text-[#393E46] text-opacity-25 shadow-2xl">Music is the moonlight in the gloomy night of life.</p>
                        <p className="text-[#222831]">
                            {variant === 'login' ? 'Sign In' : 'Sign Up'}</p>
                    </div>
                    <div className="ml-20 mr-16 my-2">
                        <form className="item-center space-y-3" onSubmit={hanldeSubmit} >
                            {variant === 'register' && (
                                <div className="">
                                    <div className="flex space-x-2">
                                        <Input
                                            label="User"
                                            onChange={(ev: any) => setUser(ev.target.value)}
                                            id="user"
                                            type="text"
                                            value={user}
                                        />
                                        <FiUser className="rounded-full h-5 w-5 text-[#393E46] mt-2"></FiUser>
                                    </div>
                                    {user.length !== 0 && (user.length < 3 || user.length >= 15) ?
                                        <span className="text-red-500 text-[10px] ml-2">Name should be too more than 15 Character and greater than 3</span>
                                        : <span className="hidden"></span>}
                                </div>
                            )}
                            <div>
                                <div className="flex flex-row space-x-2 items-center">

                                    <Input
                                        label="Email"
                                        onChange={(ev: any) => setEmail(ev.target.value)}
                                        id="email"
                                        type="email"
                                        value={email}
                                    />
                                    <HiOutlineMail className="rounded-full h-5 w-5 text-[#393E46]"></HiOutlineMail>
                                </div>
                                {email.match('@') || (email === '') ?
                                    ''
                                    : <span className="text-red-500 text-[10px] ml-2">
                                        It's not valid email address
                                    </span>}
                            </div>
                            <div className="flex flex-row space-x-2 items-center ">
                                <Input
                                    label="Password"
                                    onChange={(ev: any) => setPassword(ev.target.value)}
                                    id="password"
                                    type={`${showpw ? "text" : "password"}`}
                                    value={password}
                                />
                                <span onClick={() => {
                                    setShowpw(!showpw),
                                        console.log(`${showpw ? "text" : "password"}`)
                                }}>
                                    <AiOutlineLock className="rounded-full h-5 w-5 text-[#393E46]"
                                    ></AiOutlineLock>
                                </span>

                            </div>
                            <div>
                                {setCheckErrorLogin === null ?
                                    <span className="text-red-500 text-[10px] ml-2">
                                        setCheckErrorLogin
                                    </span> : ""
                                }
                            </div>
                            {variant === 'register' && (
                                <div className="pb-3">
                                    <div className="flex flex-row space-x-2 items-center">
                                        <Input
                                            label="Cfpassword"
                                            onChange={(ev: any) => setCfpassword(ev.target.value)}
                                            id="Cfpassword"
                                            type={`${showCpw ? "text" : "password"}`}
                                            value={cfpassword}
                                        />
                                        <span onClick={() => {
                                            setShowCpw(!showCpw),
                                                console.log(`${showCpw ? "text" : "password"}`)
                                        }}>
                                            <AiOutlineLock className="rounded-full h-5 w-5 text-[#393E46]"
                                            ></AiOutlineLock>
                                        </span>
                                    </div>
                                    {password !== cfpassword && (cfpassword !== '') ?
                                        <span className="text-red-500 text-[10px] ml-2">
                                            Confirmpassword not match together
                                        </span>
                                        : ''}
                                </div>
                            )}
                            <button
                                className="bg-[#393E46] w-[90%] p-1 rounded-2xl bg-opacity-20
                                transition duration-300 hover:translate-x-2 hover:shadow-2xl hover:-translate-y-2">
                                {variant === 'login' ? 'Log in' : 'Register'}
                            </button>
                            {variant === 'login' && (
                                <div className="grid grid-cols-3 text-gray-900 items-center w-[80%]">
                                    <hr className="border-gray-500" />
                                    <p className="text-[10px] text-center">OR</p>
                                    <hr className="border-gray-500" />
                                </div>
                            )}
                            {variant === 'login' && (
                                <div className="bg-[#393E46] p-1 rounded-2xl bg-opacity-20
                                transition duration-300 hover:translate-x-2 hover:shadow-2xl 
                                hover:-translate-y-2 flex items-center justify-center w-[80%]"
                                    onClick={handleSignInGG}>
                                    <p>Log in with Google</p>
                                    <FcGoogle className="pt-1 h-5 w-5" />
                                </div>
                            )}
                            <div className="w-fit p-2">
                                <p>
                                    Join World Music With Me
                                    <span className="text-[#00ADB5]
                                        hover:shadow-2xl"
                                        onClick={toggleVariant}>
                                        {variant === 'register' ? ' Log in' : ' Register'}</span></p>
                            </div>
                        </form>
                    </div>
                </div>
                {/* <div className='w-1/2'>
                    <Image src={headphone}
                        alt="headphone"
                        className={`${variant === 'register' ? 'rounded-2xl h-full p-2 border-2 shadow-xl' : 'rounded-2xl h-full p-2 border-2 shadow-xl'}`}
                    />
                </div> */}
            </div>
        </div>
    )

}
