export default function AccountQuestionnaire({ data, onChange }) {
    return (
        <fieldset className="space-y-4">
            <legend className="mb-3 text-lg font-bold text-white">
                Tell us about yourself.
            </legend>

            <p className="text-sm text-[#315b25]">
                Are you a business owner or employee?
            </p>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <label 
                    className={
                        `cursor-pointer rounded-xl border-2 p-4 transition ${
                            data.accountType === 'business_owner' ? (
                                'border-white bg-white/30'
                            ) : 'border-white/50 hover:bg-white/15'
                        }`
                    }
                >
                    <input 
                        type="radio"
                        name="accountType"
                        value="business_owner"
                        checked={data.accountType === "business_owner"}
                        onChange={onChange}
                        required
                        className="mr-2 accent-green-700"
                    />
                    <span className="font-semibold text-white">
                        Business owner
                    </span>
                    <p className="mt-2 text-sm text-[#b15b26]">
                        You are an owner of a transport business.
                    </p>
                </label>
                <label 
                    className={
                        `cursor-pointer rounded-xl border-2 p-4 transition ${
                            data.accountType === 'employee' ? (
                                'border-white bg-white/30'
                            ) : 'border-white/50 hover:bg-white/15'
                        }`
                    }
                >
                    <input 
                        type="radio"
                        name="accountType"
                        value="employee"
                        checked={data.accountType === "employee"}
                        onChange={onChange}
                        required
                        className="mr-2 accent-green-700"
                    />
                    <span className="font-semibold text-white">
                        Employee
                    </span>
                    <p className="mt-2 text-sm text-[#b15b26]">
                        You work for a transport business.
                    </p>
                </label>

                {/* For your company's name */}
                {data && (
                    <div className="space-y-3">
                        <label htmlFor="companyName" className="block text-sm font-medium text-[#315b26]">
                            {data.accountType === "business_owner" ? "Business name" : (
                                "Employer's business name"
                            )}
                        </label>
                        <input 
                            id="companyName"
                            name="companyName"
                            type="text"
                            value={data.companyName}
                            onChange={onChange}
                            placeholder={
                                data.accountType === "business_owner"
                                ? "Enter your business's details here"
                                : "Enter your employer's business details"
                            }
                            required
                            className="
                                w-full rounded-full
                                bg-[#dedede] px-4 py-2.5
                                text-sm text-gray-800 outline-none 
                                focus:ring-2 focus:ring-white 
                            "
                        />

                        {data.accountType === "employee" && (
                            <>
                                <label 
                                    htmlFor="invitationCode"
                                    className="block text-sm font-medium text-[#315b26]"
                                >
                                    Company invitation code (if available)
                                </label>
                                <input 
                                    id="invitationCode"
                                    name="invitationCode"
                                    type="text"
                                    value={data.invitationCode}
                                    onChange={onChange}
                                    placeholder="Place your invitation code here"
                                    className="
                                        w-full rounded-full
                                        bg-[#dedede] px-4 py-2.5
                                        text-sm text-gray-800 outline-none 
                                        focus:ring-2 focus:ring-white
                                    "
                                />
                            </>
                        )}
                    </div>
                )}
            </div>
        </fieldset>
    )
}