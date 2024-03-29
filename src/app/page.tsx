"use client";
import { useState } from "react";
import { account, ID } from "@/app/adapters/appwrite/appwrite";
import { Buttons } from "./ui/buttons";
import { Input } from "./ui/input";
import { Button } from "@nextui-org/react";
import { Image } from "@nextui-org/react";

import { Dispatch, SetStateAction } from "react";
import { stateOptic } from "./store";

export default function Page() {
  // states
  const [name, setName] = useState<string>("");
  const [isLoginLoading, setisLoginLoading] = useState<boolean>(false);

  const u_name = stateOptic((state) => (state.u_name))
  const u_email = stateOptic((state) => (state.u_email))
  const u_pass = stateOptic((state) => (state.u_pass))
  const updateUserName = stateOptic((state) => (state.update_name))
  const updateUserEmail = stateOptic((state) => (state.update_email))
  const updateUserPass = stateOptic((state) => (state.update_pass))

  const register = async () => {
    console.log(u_email, u_pass, name)
    await account.create(ID.unique(), u_email, u_pass, name)
  }
  const login = async (email: string, password: string) => {
    setisLoginLoading(true)
    const session = await account.createEmailSession(email, password)
    updateUserName(await account.get())
    setisLoginLoading(await account.get()? false : true);
  }
  const logout = async () => {
    await account.deleteSession("current");
    updateUserName(null)
  }

  function crm_logout() { }
  function crm_getUser() { }

  const fk = async () => {
    console.log("fk")
  }
  
  if (u_name) {
    return (
      <main className="flex flex-col min-h-screen justify-center items-center">
        <p>Logged in as {u_name?.name}</p>
        <button className={`${Buttons.basic}`} onClick={logout} type="button">Sign out</button>
      </main>
    )
  }

  return (
    <main className="h-full flex flex-col md:flex-row p-40">
      <div className="w-3/6 flex justify-center items-center">
        <Image
        src="https://media.tenor.com/ADP4nszb5AcAAAAi/shigure-ui-dance.gif"
        >
        </Image>
      </div>
      <div className="flex justify-center flex-col w-3/6">
        <h1 className="text-xl text-center">AppWrite Test</h1>
        <div className="flex flex-col items-center">
            <input type="text"
                className={`${Input.basic} m-2`}
                placeholder="username"
                value={name}
                onChange={(e) => {setName(e.target.value)}}
            />
            <input type="email"
                className={`${Input.basic} m-2`}
                placeholder="Email Address"
                value={u_email}
                onChange={(e) => {updateUserEmail(e.target.value)}}
            />
            <input type="password"
                className={`${Input.basic} m-2`}
                placeholder="Password"
                value={u_pass}
                onChange={(e) => {updateUserPass(e.target.value)}}
            />
            <div className="flex flex-row justify-center m-6">
              <Button className={`${Buttons.basic}`} onClick={register}>Register</Button>
              <Button className={`${Buttons.basic}`} isLoading={isLoginLoading} onClick={() => { login(u_email, u_pass) }}>Login</Button>
            </div>
        </div>
      </div>
    </main>
  )
}
