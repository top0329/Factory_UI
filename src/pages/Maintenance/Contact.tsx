import Button from '../../components/Button';

export default function ContactUs() {
  return (
    <div className="p-24">
      <p className="text-white font-black text-6xl">Contact Us</p>
      <form className="flex flex-col gap-y-7 py-8">
        <div className="flex flex-col gap-y-2">
          <p className="text-lg text-[#858584]">Name:</p>
          <input
            className="text-white border-[0.5px] w-full py-1 px-4 rounded-md text-3xl bg-[#010B10] border-secondary"
            maxLength={20}
            required
          />
        </div>
        <div className="flex flex-col gap-y-2">
          <p className="text-lg text-[#858584]">Email:</p>
          <input
            className="text-white border-[0.5px] w-full py-1 px-4 rounded-md text-3xl bg-[#010B10] border-secondary"
            maxLength={20}
            required
          />
        </div>
        <div className="flex flex-col gap-y-2">
          <p className="text-lg text-[#858584]">Phone Number:</p>
          <input
            className="text-white border-[0.5px] w-full py-1 px-4 rounded-md text-3xl bg-[#010B10] border-secondary"
            maxLength={20}
            required
          />
        </div>
        <div className="flex flex-col gap-y-2">
          <p className="text-lg text-[#858584]">Message:</p>
          <textarea
            rows={5}
            className="text-white border-[0.5px] w-full py-1 px-4 rounded-md text-3xl bg-[#010B10] border-secondary"
            required
          />
        </div>
        <Button
          className="flex justify-center items-center m-auto w-[160px] rounded-xl text-2xl"
          text="Submit"
          variant="primary"
        />
      </form>
    </div>
  );
}
