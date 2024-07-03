const LoadingLandingPage = () => {
  return (
    <div className="relative text-white bg-landing overflow-hidden">
      <div className="px-6 xl:px-20 lg:px-16 md:px-12 sm:px-10 2xl:max-w-[1536px] 2xl:min-px-96 2xl:min-w-full">
        <div className="grid grid-cols-12 pt-2 md:pt-4 lg:pt-8">
          <div className="col-span-12 md:col-span-6">
            <h1 className="mt-4 bg-[#1a1919] animate-pulse rounded-2xl font-bold text-[30px] min-h-[80px] leading-[40px] xl:text-[66px] xl:min-h-40 xl:leading-[80px] lg:text-[50px] lg:min-h-[120px] lg:mt-10 md:text-[38px] md:mt-4 sm:text-[40px] sm:leading-[60px]"></h1>
            <h2 className="text-xl bg-[#1a1919] animate-pulse rounded-2xl mt-4 leading-[30px] xl:text-[32px] min-h-[76px] xl:min-h-[116px] xl:leading-[50px] lg:text-[28px] lg:min-h-[96px] sm:text-2xl sm:leading-[40px]"></h2>
            <div className="bg-[#1a1919] animate-pulse rounded-2xl min-h-[36px] max-w-[296px] mt-8 mx-0 md:w-96 lg:pt-16 sm:min-h-[44px] sm:pt-14 sm:mx-4 sm:w-96 sm:max-w-96"></div>
          </div>
          <div className="col-span-12 md:col-span-6">
            <div className="bg-[#1a1919] animate-pulse rounded-2xl min-h-[350px] mt-20 ml-0 items-center z-30 px-1 top-[170px] right-[116px] xl:mt-20 lg:min-h-[460px] md:mt-10 md:ml-32 sm:min-h-[400px]"></div>
          </div>
        </div>
      </div>
      <div className="mt-10 h-[400px] sm:h-[550px] md:h-[620px] lg:h-[650px] xl:h-[680px] flex flex-col items-center">
        <h1 className="bg-[#1a1919] animate-pulse rounded-2xl w-[300px] h-10 text-xl font-semibold mt-6 sm:w-[500px] sm:h-12 sm:text-3xl"></h1>
        <div className="bg-[#1a1919] animate-pulse rounded-2xl w-full h-[230px] max-w-[460px] mx-6 mt-4 xl:mx-20 xl:max-w-[1280px] lg:mx-16 lg:max-w-[1024px] md:mx-12 md:max-w-[768px] sm:mx-10 sm:max-w-[640px] sm:h-[300px] 2xl:max-w-[1536px] 2xl:mx-96 2xl:h-[440px]"></div>
      </div>
      <div className="bg-[#1a1919] animate-pulse h-[296px] sm:h-[320px] md:h-[212px] lg:h-[220px] xl:h-[264px] 2xl:h-[308px] 2xl:min-w-full"></div>
      <div className="mx-6 mb-28 mt-20 shadow-light-gray sm:mx-10 sm:my-30 sm:mt-4 md:mx-15 md:my-8 md:mt-6 lg:mx-20 lg:my-12 lg:mt-[80px] 2xl:max-w-[1536px] 2xl:min-mx-96 2xl:min-w-full">
        <h1 className="bg-[#1a1919] animate-pulse rounded-2xl h-[64px] text-light-gray font-bold text-xl w-[200px] mb-10 sm:mb-14 sm:text-2xl md:mb-12 md:h-[40px] md:text-3xl md:w-[450px] lg:mb-12 lg:w-[600px] lg:text-4xl"></h1>
        <div className="grid grid-cols-12 bg-[#09080e]">
          <div className="h-[420px] col-span-12 px-3 py-10 gap-4 flex flex-col justify-center items-start md:col-span-6 lg:col-span-7 lg:gap-8 lg:px-10">
            <p className="bg-[#1a1919] animate-pulse rounded-2xl w-[98%] sm:w-[90%] lg:w-[98%] h-20 ml-3"></p>
            <p className="bg-[#1a1919] animate-pulse rounded-2xl w-[98%] sm:w-[90%] lg:w-[98%] h-20 ml-3"></p>
            <p className="bg-[#1a1919] animate-pulse rounded-2xl w-[98%] sm:w-[90%] lg:w-[98%] h-20 ml-3"></p>
          </div>
          <div className="bg-[#1a1919] animate-pulse rounded-2xl col-span-12 h-[440px] md:col-span-6 lg:col-span-5 md:h-full"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingLandingPage;
