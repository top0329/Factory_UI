import { useState } from 'react';
import { Link } from 'react-router-dom';
import emailJs from '@emailjs/browser';
import { Helmet } from 'react-helmet';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

import Button from '../../components/Button';
import Image from '../../components/Image';
import PhoneNumberInput from '../../components/PhoneNumberInput';
import useToast from '../../hooks/useToast';
import ContactUsImage from '../../assets/svg/contact-us.svg';
import TeamImage from '../../assets/svg/team.svg';
import ChatIcon from '../../assets/svg/chat-icon.svg';
import SupportIcon from '../../assets/svg/support-icon.svg';
import ShareIcon from '../../assets/svg/share-icon.svg';

export default function ContactUs() {
  const { showToast } = useToast();

  const {
    setValue,
    control,
    handleSubmit,
    formState: { errors, isSubmitted },
    getValues,
  } = useForm<FieldValues>();

  const initalState = {
    firstName: '',
    lastName: '',
    email: '',
    message: '',
  };

  const [form, setForm] = useState(initalState);

  const handleInputChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleClick: SubmitHandler<FieldValues> = () => {
    const { firstName, lastName, email, message } = form;
    const number = getValues('phoneNumber');
    if (firstName && lastName && email && number && message) {
      if (!validateNumber(number)) return;
      if (validateEmail(email))
        emailJs
          .send(
            'service_q3nio78',
            'template_kw86h2m',
            {
              from_name: `${form.firstName} ${form.lastName}`,
              from_email: form.email,
              message: form.message,
              number: number,
            },
            'M6jnU3EEYwoZrQ-zE'
          )
          .then(() => {
            showToast('success', 'Message sent successfully.');
          })
          .catch((err) => {
            console.log(err);
            showToast('fail', 'Something went wrong. Please try again later.');
          });
    }
  };

  function validateEmail(email: string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function validateNumber(num: string) {
    const numString: string = num.toString();
    let count = 0;
    for (let i = 0; i < numString.length; i++) {
      if (isNaN(Number(numString[i]))) {
        return false;
      } else {
        count++;
      }
    }
    if (count >= 10) {
      return true;
    }
    return false;
  }

  return (
    <div className="pt-16 pb-24 text-white w-full">
      <Helmet>
        <meta
          name="description"
          content="This is factorygame.org. Here you can get the unique 'Product Token' which is combined of 'blueprint token' and component tokens - ERC20, ERC721 and ERC1155 tokens. You can contact us with this page."
        />
        <meta
          name="keyword"
          content="Factory, Factory1155, Blueprint, Product, Custody, Component Token, Combine, Synthesis, Decompose"
        />
        <meta property="og:title" content="Factory/Contact" />
        <meta
          property="og:description"
          content="This is factorygame.org. Here you can get the unique 'Product Token' which is combined of 'blueprint token' and component tokens - ERC20, ERC721 and ERC1155 tokens. You can contact us with this page."
        />
        <meta
          name="description"
          content="This is factorygame.org. Here you can get the unique 'Product Token' which is combined of 'blueprint token' and component tokens - ERC20, ERC721 and ERC1155 tokens. You can contact us with this page."
        />
        <meta
          name="keyword"
          content="Factory, Factory1155, Blueprint, Product, Custody, Component Token, Combine, Synthesis, Decompose"
        />
        <meta property="og:title" content="Factory" />
        <meta
          property="og:description"
          content="This is factorygame.org. Here you can get the unique 'Product Token' which is combined of 'blueprint token' and component tokens - ERC20, ERC721 and ERC1155 tokens."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://factorygame.org/" />
        <meta property="twitter:title" content="Factory1155" />
        <meta
          property="twitter:description"
          content="This is factorygame.org. Here you can get the unique 'Product Token' which is combined of 'blueprint token' and component tokens - ERC20, ERC721 and ERC1155 tokens"
        />
      </Helmet>
      <div className="grid grid-cols-2 w-full gap-12 pb-24">
        <div className="col-span-2 flex flex-col justify-between p-6 h-full gap-12 xl:p-10 lg:col-span-1">
          <div className="flex flex-col">
            <h2 className="text-4xl font-semibold">Contact Us</h2>
            <h5 className="text-[#C5C5C5] text-xl mt-5">
              Our friendly team would love to hear from you.
            </h5>
          </div>
          <form
            onSubmit={handleSubmit(handleClick)}
            className="flex flex-col justify-between h-full gap-6"
          >
            <div className="flex flex-col justify-between gap-6 xs:flex-row xs:gap-8">
              <div className="flex flex-col w-full min-w-40 gap-1.5">
                <label className="text-sm">First Name</label>
                <input
                  name="firstName"
                  className="py-2.5 px-3.5 text-base rounded-lg bg-[#161925]"
                  placeholder="First Name"
                  type="text"
                  onChange={handleInputChange}
                  value={form.firstName}
                  required
                />
              </div>
              <div className="flex flex-col w-full min-w-40 gap-1.5">
                <label className="text-sm">Last Name</label>
                <input
                  name="lastName"
                  className="py-2.5 px-3.5 text-base rounded-lg bg-[#161925]"
                  placeholder="Last Name"
                  type="text"
                  onChange={handleInputChange}
                  value={form.lastName}
                  required
                />
              </div>
            </div>
            <div className="flex flex-col w-full gap-1.5">
              <label className="text-sm">Email</label>
              <input
                name="email"
                className="py-2.5 px-3.5 text-base rounded-lg bg-[#161925]"
                placeholder="you@company.com"
                type="email"
                onChange={handleInputChange}
                value={form.email}
                required
              />
            </div>
            <div className="flex flex-col w-full gap-1.5">
              <label className="text-sm">Phone Number</label>
              <PhoneNumberInput
                control={control}
                setValue={setValue}
                id="phoneNumber"
                errors={errors}
                isSubmitted={isSubmitted}
              />
            </div>
            <div className="flex flex-col w-full gap-1.5">
              <label className="text-sm">Message</label>
              <textarea
                name="message"
                className="w-full py-3 px-3.5 rounded-lg text-base bg-[#161925] resize-none h-36"
                rows={5}
                placeholder="Leave us a message..."
                onChange={handleInputChange}
                value={form.message}
                required
              />
            </div>
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="remember"
                  type="checkbox"
                  value=""
                  className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300"
                  required
                />
              </div>
              <label htmlFor="remember" className="ms-2 text-base text-white">
                You agree to our friendly{' '}
                <Link to="/privacy" className="text-primary underline">
                  privacy policy
                </Link>
                .
              </label>
            </div>
            <Button
              className="flex justify-center items-center text-base font-semibold w-full rounded-lg"
              text="Submit message"
              variant="primary"
            />
          </form>
        </div>
        <Image
          className="col-span-1 w-full h-full object-cover rounded-xl hidden lg:block"
          src={ContactUsImage}
          spinnerClassName="w-full aspect-auto rounded-xl"
          alt="contact-us"
        />
      </div>
      <div className="text-center">
        <h1 className="mt-11 text-4xl font-semibold">
          We'd love to hear from you
        </h1>
        <h3 className="mt-5 mb-16 text-[#C5C5C5] text-xl">
          Chat to our friendly team.
        </h3>
        <Image
          className="px-8 w-full aspect-auto rounded-xl"
          src={TeamImage}
          spinnerClassName="px-8 w-full aspect-auto rounded-xl"
          alt="team"
        />
        <div className="flex flex-col justify-between items-center pt-24 px-8 gap-8 lg:flex-row">
          <div className="p-6 bg-[#2B2F40] rounded-lg w-full h-full min-h-[286px] text-left">
            <img className="mb-16" src={ChatIcon} alt="chat-cion" />
            <h3 className="text-2xl font-semibold mb-2">Chat to Us</h3>
            <p className="text-base text-[#C5C5C5]">
              Our friendly team is here to help.
            </p>
          </div>
          <div className="p-6 bg-[#2B2F40] rounded-lg w-full h-full min-h-[286px] text-left">
            <img className="mb-16" src={SupportIcon} alt="chat-cion" />
            <h3 className="text-2xl font-semibold mb-2">Live support</h3>
            <p className="text-base text-[#C5C5C5]">
              Come join our Telegram community for live support! We're here to l
              help you out.
            </p>
          </div>
          <div className="p-6 bg-[#2B2F40] rounded-lg w-full h-full min-h-[286px] text-left">
            <img className="mb-16" src={ShareIcon} alt="chat-cion" />
            <h3 className="text-2xl font-semibold mb-2">Share ideas</h3>
            <p className="text-base text-[#C5C5C5]">
              Talk to our friendly team about what you want, and we'll make it a
              reality!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
