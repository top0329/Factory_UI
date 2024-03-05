// import { useAtom } from 'jotai';
// import { useEffect, useRef } from 'react';

// import { isMintBlueprintModalAtom } from '../../jotai/atoms';

// export interface Props {
//   text: string;
// }

// const MintBlueprintModal = () => {
//   const [isMintBlueprintModal, setIsMintBlueprintModal] = useAtom(
//     isMintBlueprintModalAtom
//   );

//   const modal = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const keyHandler = ({ keyCode }: KeyboardEvent) => {
//       if (!isMintBlueprintModal || keyCode !== 27) return;
//       setIsMintBlueprintModal(false);
//     };
//     document.addEventListener('keydown', keyHandler);
//     return () => document.removeEventListener('keydown', keyHandler);
//   });

//   return (
//     <div
//       className={`absolute left-0 top-0 flex h-full min-h-screen w-full items-center justify-center px-4 py-5 ${
//         isMintBlueprintModal ? 'block' : 'hidden'
//       }`}
//     >
//       <div
//         className="z-20 fixed right-0 bottom-0 top-0 left-0 flex items-center justify-center bg-opacity-80 bg-[#1D2127]"
//         onClick={() => setIsMintBlueprintModal(false)}
//       ></div>
//       <div
//         ref={modal}
//         onFocus={() => setIsMintBlueprintModal(true)}
//         onBlur={() => setIsMintBlueprintModal(false)}
//         className="z-30 w-full max-w-[570px] rounded-[20px] bg-white px-8 py-12 text-center dark:bg-dark-2 md:px-[70px] md:py-[60px]"
//       >
//         <h3 className="pb-[18px] text-xl font-semibold text-black sm:text-2xl">
//           Mint Blueprint Modal
//         </h3>
//         <span
//           className={`mx-auto mb-6 inline-block h-1 w-[90px] rounded bg-primary`}
//         ></span>
//         <p className="mb-10 text-base leading-relaxed text-body-color dark:text-dark-6">
//           Lorem Ipsum is simply dummy text of the printing and typesetting
//           industry. Lorem Ipsum has been the industry's standard dummy text ever
//           since
//         </p>
//         <div className="-mx-3 flex flex-wrap">
//           <div className="w-1/2 px-3">
//             <button
//               onClick={() => setIsMintBlueprintModal(false)}
//               className="block w-full rounded-md border border-stroke p-3 text-center text-base font-medium text-dark transition hover:border-red-600 hover:bg-red-600 hover:text-white dark:text-white"
//             >
//               Cancel
//             </button>
//           </div>
//           <div className="w-1/2 px-3"></div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MintBlueprintModal;
