import { Buttons } from "../ui/buttons"
import { Input } from "../ui/input"

export default function Page() {
    return (
        <main className="min-h-screen flex justify-center flex-col">
            <div className="flex flex-col items-center">
                <input type="email"
                    className={`${Input.basic} m-2`}
                    placeholder="Email Address"
                />
                <input type="password"
                    className={`${Input.basic} m-2`}
                    placeholder="Password"
                />
                <button className={`${Buttons.basic}`}>Submit</button>
            </div>
        </main>
    )
}
