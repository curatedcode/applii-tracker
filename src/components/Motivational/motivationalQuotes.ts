const motivationalQuotes = [
	"Embrace the challenge of the job search, for within it lies the opportunity to discover your true potential.",
	"In the realm of possibilities, your dream job awaits. Stay persistent and let your passion guide you.",
	"Every rejection is a redirection towards the perfect job. Keep moving forward with resilience and determination.",
	"Job hunting is a journey, not a destination. Each step brings you closer to the career you were meant for.",
	"Your skills are your currency. Invest wisely in the job market, and watch your career portfolio grow.",
	"A job seeker's greatest asset is not just a resume, but the unwavering belief in one's abilities.",
	"In the vast landscape of opportunities, be the architect of your destiny. Design a career that fulfills your aspirations.",
	"The job market is a canvas; your skills are the paint. Create a masterpiece that reflects the brilliance of your potential.",
	"With every application, you're planting the seeds of your future success. Water them with persistence, and watch your career bloom.",
	"Success is not just about finding a job; it's about finding the right job that aligns with your passion and purpose.",
	"Turn setbacks into setups for comebacks. Your dream job is waiting for you on the other side of perseverance.",
	"A job search is like a puzzle; each rejection is a piece that brings you closer to completing the picture of your perfect career.",
	"Every interview is an opportunity to showcase the unique value you bring to the table. Shine bright, and the right job will find you.",
	"The job market is a stage, and you are the lead actor. Own your role with confidence, and success will be your standing ovation.",
	"Patience is not the ability to wait but the ability to keep a positive attitude while waiting. Your ideal job is worth the wait.",
	"Your skills are the compass guiding you through the job market. Trust their direction, and you'll navigate towards success.",
	"In the realm of job hunting, perseverance is the key that unlocks the door to a fulfilling and rewarding career.",
	"Job searching is not just about finding a paycheck; it's about discovering a purpose that fuels your passion every day.",
	"The job market is full of opportunities disguised as challenges. Approach each one with courage, and you'll unlock the door to success.",
	"Your journey may be tough, but so are you. Keep pushing forward, and the right job will meet you at the end of the road.",
	"The job market is a playground of possibilities. Don't be afraid to swing high, reach far, and seize the career that's meant for you.",
	"Every rejection is a stepping stone, not a stumbling block. Use them to build the path to your dream job.",
	"Job hunting is not a sprint; it's a marathon. Pace yourself, stay focused, and cross the finish line with your dream job in sight.",
	"Your qualifications are the keys to unlock the doors of opportunity. Keep searching, and you'll find the one that leads to your dream job.",
	"Believe in the magic of new beginnings. Each job application is a chance for your career to write a beautiful and successful story.",
	"Your job search is a reflection of your determination. Keep polishing, and soon your career will shine brightly.",
	"The job market is a dance floor, and you are the rhythm of success. Move confidently, and watch your career take center stage.",
	"Job hunting is like a puzzle; every rejection is a missing piece. Keep searching, and you'll complete the picture of your perfect career.",
	"In the journey of job searching, setbacks are just setups for comebacks. Your comeback story is waiting to be written.",
	"The job market is a garden of opportunities. Plant the seeds of your skills, water them with effort, and watch your career blossom.",
	"Your dream job is not just a destination; it's a journey of self-discovery and growth. Enjoy the process, and success will follow.",
	"Job searching is a marathon, not a sprint. Pace yourself, stay focused, and cross the finish line with the career you've always dreamed of.",
	"Your skills are the building blocks of your career. Stack them wisely, and you'll construct a path to success in the job market.",
	"In the symphony of job hunting, persistence is your strongest note. Play it well, and the melody of success will follow.",
	"The job market is a vast ocean of opportunities. Dive in with courage, and you'll discover the pearls of your dream career.",
	"Each rejection is a brushstroke in the masterpiece of your career. Keep painting, and soon you'll unveil the portrait of success.",
	"Job hunting is not just about finding a job; it's about finding a passion that fuels your professional journey.",
	"Your skills are the currency of the job market. Invest them wisely, and you'll accrue a wealth of opportunities.",
	"Job searching is a quest for the extraordinary. Embrace the challenge, and you'll discover the extraordinary career meant just for you.",
	"The job market is a puzzle waiting to be solved. Piece by piece, rejection by rejection, you're getting closer to finding your perfect fit.",
	"Success is not a destination; it's a journey filled with job applications, interviews, and self-discovery. Enjoy the ride.",
	"In the job market, your skills are the keys to unlocking doors of opportunity. Keep searching, and you'll find the right door for your dream job.",
	"Every rejection is a lesson in resilience. Learn from it, grow stronger, and keep pursuing the job that aligns with your passion.",
	"Your dream job is not just a goal; it's a destination on the map of your professional journey. Keep navigating, and you'll arrive.",
	"Job hunting is a treasure hunt for the career of your dreams. Stay persistent, and the treasure will be yours to uncover.",
	"The job market is a canvas; your experiences are the brushstrokes. Paint a career that reflects the masterpiece of your potential.",
	"Each job application is a step towards self-discovery. Learn, adapt, and you'll walk the path that leads to your dream job.",
	"Your skills are the compass guiding you through the job market. Trust their direction, and you'll navigate towards the success you seek.",
	"In the dance of job hunting, resilience is your partner. Keep moving, keep dancing, and success will be your grand finale.",
	"Your dream job is not just a destination; it's a journey of growth and fulfillment. Enjoy the process, and success will follow.",
	"Job searching is like planting seeds; with patience and persistence, you'll reap the harvest of a fulfilling career.",
	"Your skills are the toolkit for success. Use them wisely, and you'll build a career that stands the test of time.",
	"In the grand orchestra of job hunting, your skills are the melody. Play them with passion, and success will be your symphony.",
	"Every rejection is a bridge to resilience. Cross it, and you'll find yourself closer to the job that's meant for you.",
	"Your dream job is not just a goal; it's a journey of self-discovery and growth. Keep moving forward, and success will be your constant companion.",
	"Job searching is a puzzle; every rejection is a missing piece. Keep searching, and you'll complete the picture of your perfect career.",
	"In the job market, your skills are the currency. Invest them wisely, and you'll accumulate a wealth of opportunities.",
	"Success is not just about finding a job; it's about finding the right job that aligns with your passion and purpose.",
	"Your dream job is not just a destination; it's a journey of growth and self-discovery. Enjoy every step, and success will follow.",
	"Job hunting is a journey of self-discovery. Embrace the challenges, learn from the setbacks, and watch your dream career unfold.",
	"Your skills are the compass guiding you through the job market. Trust their direction, and you'll navigate towards the success you deserve.",
	"Every rejection is a step towards resilience. Keep stepping, and you'll find yourself closer to the job that's meant for you.",
	"In the job market, your skills are the keys to unlocking doors of opportunity. Keep searching, and you'll find the right door for your dream job.",
	"Success is not just about finding a job; it's about finding the right job that aligns with your passion and purpose.",
	"Your dream job is not just a destination; it's a journey of self-discovery and growth. Enjoy the process, and success will follow.",
	"Job searching is like planting seeds; with patience and persistence, you'll reap the harvest of a fulfilling career.",
	"Your skills are the toolkit for success. Use them wisely, and you'll build a career that stands the test of time.",
	"In the grand orchestra of job hunting, your skills are the melody. Play them with passion, and success will be your symphony.",
	"Every rejection is a bridge to resilience. Cross it, and you'll find yourself closer to the job that's meant for you.",
	"Your dream job is not just a goal; it's a journey of self-discovery and growth. Keep moving forward, and success will be your constant companion.",
	"Job searching is a puzzle; every rejection is a missing piece. Keep searching, and you'll complete the picture of your perfect career.",
	"In the job market, your skills are the currency. Invest them wisely, and you'll accumulate a wealth of opportunities.",
	"Success is not just about finding a job; it's about finding the right job that aligns with your passion and purpose.",
	"Your dream job is not just a destination; it's a journey of growth and self-discovery. Enjoy every step, and success will follow.",
	"Job hunting is a journey of self-discovery. Embrace the challenges, learn from the setbacks, and watch your dream career unfold.",
	"Your skills are the compass guiding you through the job market. Trust their direction, and you'll navigate towards the success you deserve.",
	"Every rejection is a step towards resilience. Keep stepping, and you'll find yourself closer to the job that's meant for you.",
	"In the job market, your skills are the keys to unlocking doors of opportunity. Keep searching, and you'll find the right door for your dream job.",
	"Success is not just about finding a job; it's about finding the right job that aligns with your passion and purpose.",
	"Your dream job is not just a destination; it's a journey of self-discovery and growth. Enjoy the process, and success will follow.",
	"Job searching is like planting seeds; with patience and persistence, you'll reap the harvest of a fulfilling career.",
	"Your skills are the toolkit for success. Use them wisely, and you'll build a career that stands the test of time.",
	"In the grand orchestra of job hunting, your skills are the melody. Play them with passion, and success will be your symphony.",
	"Every rejection is a bridge to resilience. Cross it, and you'll find yourself closer to the job that's meant for you.",
	"Your dream job is not just a goal; it's a journey of self-discovery and growth. Keep moving forward, and success will be your constant companion.",
	"Job searching is a puzzle; every rejection is a missing piece. Keep searching, and you'll complete the picture of your perfect career.",
	"In the job market, your skills are the currency. Invest them wisely, and you'll accumulate a wealth of opportunities.",
	"Success is not just about finding a job; it's about finding the right job that aligns with your passion and purpose.",
	"Your dream job is not just a destination; it's a journey of growth and self-discovery. Enjoy every step, and success will follow.",
	"Job hunting is a journey of self-discovery. Embrace the challenges, learn from the setbacks, and watch your dream career unfold.",
	"Your skills are the compass guiding you through the job market. Trust their direction, and you'll navigate towards the success you deserve.",
	"Every rejection is a step towards resilience. Keep stepping, and you'll find yourself closer to the job that's meant for you.",
	"In the job market, your skills are the keys to unlocking doors of opportunity. Keep searching, and you'll find the right door for your dream job.",
	"Success is not just about finding a job; it's about finding the right job that aligns with your passion and purpose.",
	"Your dream job is not just a destination; it's a journey of self-discovery and growth. Enjoy the process, and success will follow.",
	"Job searching is like planting seeds; with patience and persistence, you'll reap the harvest of a fulfilling career.",
	"Your skills are the toolkit for success. Use them wisely, and you'll build a career that stands the test of time.",
	"In the grand orchestra of job hunting, your skills are the melody. Play them with passion, and success will be your symphony.",
	"Every rejection is a bridge to resilience. Cross it, and you'll find yourself closer to the job that's meant for you.",
	"Your dream job is not just a goal; it's a journey of self-discovery and growth. Keep moving forward, and success will be your constant companion.",
	"Job searching is a puzzle; every rejection is a missing piece. Keep searching, and you'll complete the picture of your perfect career.",
	"In the job market, your skills are the currency. Invest them wisely, and you'll accumulate a wealth of opportunities.",
	"Success is not just about finding a job; it's about finding the right job that aligns with your passion and purpose.",
	"Your dream job is not just a destination; it's a journey of growth and self-discovery. Enjoy every step, and success will follow.",
	"Job hunting is a journey of self-discovery. Embrace the challenges, learn from the setbacks, and watch your dream career unfold.",
	"Your skills are the compass guiding you through the job market",
	"Embrace the challenge of the job search, for within it lies the opportunity to discover your true potential.",
	"In the realm of possibilities, your dream job awaits. Stay persistent and let your passion guide you.",
	"Every rejection is a redirection towards the perfect job. Keep moving forward with resilience and determination.",
	"Job hunting is a journey, not a destination. Each step brings you closer to the career you were meant for.",
	"Your skills are your currency. Invest wisely in the job market, and watch your career portfolio grow.",
	"A job seeker's greatest asset is not just a resume, but the unwavering belief in one's abilities.",
	"In the vast landscape of opportunities, be the architect of your destiny. Design a career that fulfills your aspirations.",
	"The job market is a canvas; your skills are the paint. Create a masterpiece that reflects the brilliance of your potential.",
	"With every application, you're planting the seeds of your future success. Water them with persistence, and watch your career bloom.",
	"Success is not just about finding a job; it's about finding the right job that aligns with your passion and purpose.",
	"Turn setbacks into setups for comebacks. Your dream job is waiting for you on the other side of perseverance.",
	"A job search is like a puzzle; each rejection is a piece that brings you closer to completing the picture of your perfect career.",
	"Every interview is an opportunity to showcase the unique value you bring to the table. Shine bright, and the right job will find you.",
	"The job market is a stage, and you are the lead actor. Own your role with confidence, and success will be your standing ovation.",
	"Patience is not the ability to wait but the ability to keep a positive attitude while waiting. Your ideal job is worth the wait.",
	"Your skills are the compass guiding you through the job market. Trust their direction, and you'll navigate towards success.",
	"In the realm of job hunting, perseverance is the key that unlocks the door to a fulfilling and rewarding career.",
	"Job searching is not just about finding a paycheck; it's about discovering a purpose that fuels your passion every day.",
	"The job market is full of opportunities disguised as challenges. Approach each one with courage, and you'll unlock the door to success.",
	"Your journey may be tough, but so are you. Keep pushing forward, and the right job will meet you at the end of the road.",
	"The job market is a playground of possibilities. Don't be afraid to swing high, reach far, and seize the career that's meant for you.",
	"Every rejection is a stepping stone, not a stumbling block. Use them to build the path to your dream job.",
	"Job hunting is not a sprint; it's a marathon. Pace yourself, stay focused, and cross the finish line with your dream job in sight.",
	"Your qualifications are the keys to unlock the doors of opportunity. Keep searching, and you'll find the one that leads to your dream job.",
	"Believe in the magic of new beginnings. Each job application is a chance for your career to write a beautiful and successful story.",
	"Your job search is a reflection of your determination. Keep polishing, and soon your career will shine brightly.",
	"The job market is a dance floor, and you are the rhythm of success. Move confidently, and watch your career take center stage.",
	"Job hunting is like a puzzle; every rejection is a missing piece. Keep searching, and you'll complete the picture of your perfect career.",
	"In the journey of job searching, setbacks are just setups for comebacks. Your comeback story is waiting to be written.",
	"The job market is a garden of opportunities. Plant the seeds of your skills, water them with effort, and watch your career blossom.",
	"Your dream job is not just a destination; it's a journey of self-discovery and growth. Enjoy the process, and success will follow.",
	"Job searching is a marathon, not a sprint. Pace yourself, stay focused, and cross the finish line with the career you've always dreamed of.",
	"Your skills are the building blocks of your career. Stack them wisely, and you'll construct a path to success in the job market.",
	"In the symphony of job hunting, persistence is your strongest note. Play it well, and the melody of success will follow.",
	"The job market is a vast ocean of opportunities. Dive in with courage, and you'll discover the pearls of your dream career.",
	"Each rejection is a brushstroke in the masterpiece of your career. Keep painting, and soon you'll unveil the portrait of success.",
	"Job hunting is not just about finding a job; it's about finding a passion that fuels your professional journey.",
	"Your skills are the currency of the job market. Invest them wisely, and you'll accrue a wealth of opportunities.",
	"Job searching is a quest for the extraordinary. Embrace the challenge, and you'll discover the extraordinary career meant just for you.",
	"The job market is a puzzle waiting to be solved. Piece by piece, rejection by rejection, you're getting closer to finding your perfect fit.",
	"Success is not a destination; it's a journey filled with job applications, interviews, and self-discovery. Enjoy the ride.",
	"In the job market, your skills are the keys to unlocking doors of opportunity. Keep searching, and you'll find the right door for your dream job.",
	"Every rejection is a lesson in resilience. Learn from it, grow stronger, and keep pursuing the job that aligns with your passion.",
	"Your dream job is not just a goal; it's a destination on the map of your professional journey. Keep navigating, and you'll arrive.",
	"Job hunting is a treasure hunt for the career of your dreams. Stay persistent, and the treasure will be yours to uncover.",
	"The job market is a canvas; your experiences are the brushstrokes. Paint a career that reflects the masterpiece of your potential.",
	"Each job application is a step towards self-discovery. Learn, adapt, and you'll walk the path that leads to your dream job.",
	"Your skills are the compass guiding you through the job market. Trust their direction, and you'll navigate towards the success you seek.",
	"In the dance of job hunting, resilience is your partner. Keep moving, keep dancing, and success will be your grand finale.",
	"Your dream job is not just a destination; it's a journey of growth and fulfillment. Enjoy the process, and success will follow.",
	"Job searching is like planting seeds; with patience and persistence, you'll reap the harvest of a fulfilling career.",
	"Your skills are the toolkit for success. Use them wisely, and you'll build a career that stands the test of time.",
	"In the grand orchestra of job hunting, your skills are the melody. Play them with passion, and success will be your symphony.",
	"Every rejection is a bridge to resilience. Cross it, and you'll find yourself closer to the job that's meant for you.",
	"Your dream job is not just a goal; it's a journey of self-discovery and growth. Keep moving forward, and success will be your constant companion.",
	"Job searching is a puzzle; every rejection is a missing piece. Keep searching, and you'll complete the picture of your perfect career.",
	"In the job market, your skills are the currency. Invest them wisely, and you'll accumulate a wealth of opportunities.",
	"Success is not just about finding a job; it's about finding the right job that aligns with your passion and purpose.",
	"Your dream job is not just a destination; it's a journey of growth and self-discovery. Enjoy every step, and success will follow.",
	"Job hunting is a journey of self-discovery. Embrace the challenges, learn from the setbacks, and watch your dream career unfold.",
	"Your skills are the compass guiding you through the job market. Trust their direction, and you'll navigate towards the success you deserve.",
	"Every rejection is a step towards resilience. Keep stepping, and you'll find yourself closer to the job that's meant for you.",
	"In the job market, your skills are the keys to unlocking doors of opportunity. Keep searching, and you'll find the right door for your dream job.",
	"Success is not just about finding a job; it's about finding the right job that aligns with your passion and purpose.",
	"Your dream job is not just a destination; it's a journey of self-discovery and growth. Enjoy the process, and success will follow.",
	"Job searching is like planting seeds; with patience and persistence, you'll reap the harvest of a fulfilling career.",
	"Your skills are the toolkit for success. Use them wisely, and you'll build a career that stands the test of time.",
	"In the grand orchestra of job hunting, your skills are the melody. Play them with passion, and success will be your symphony.",
	"Every rejection is a bridge to resilience. Cross it, and you'll find yourself closer to the job that's meant for you.",
	"Your dream job is not just a goal; it's a journey of self-discovery and growth. Keep moving forward, and success will be your constant companion.",
	"Job searching is a puzzle; every rejection is a missing piece. Keep searching, and you'll complete the picture of your perfect career.",
	"In the job market, your skills are the currency. Invest them wisely, and you'll accumulate a wealth of opportunities.",
	"Success is not just about finding a job; it's about finding the right job that aligns with your passion and purpose.",
	"Your dream job is not just a destination; it's a journey of growth and self-discovery. Enjoy every step, and success will follow.",
	"Job hunting is a journey of self-discovery. Embrace the challenges, learn from the setbacks, and watch your dream career unfold.",
	"Your skills are the compass guiding you through the job market. Trust their direction, and you'll navigate towards the success you deserve.",
	"Every rejection is a step towards resilience. Keep stepping, and you'll find yourself closer to the job that's meant for you.",
	"In the job market, your skills are the keys to unlocking doors of opportunity. Keep searching, and you'll find the right door for your dream job.",
	"Success is not just about finding a job; it's about finding the right job that aligns with your passion and purpose.",
	"Your dream job is not just a destination; it's a journey of self-discovery and growth. Enjoy the process, and success will follow.",
	"Job searching is like planting seeds; with patience and persistence, you'll reap the harvest of a fulfilling career.",
	"Your skills are the toolkit for success. Use them wisely, and you'll build a career that stands the test of time.",
	"In the grand orchestra of job hunting, your skills are the melody. Play them with passion, and success will be your symphony.",
	"Every rejection is a bridge to resilience. Cross it, and you'll find yourself closer to the job that's meant for you.",
	"Your dream job is not just a goal; it's a journey of self-discovery and growth. Keep moving forward, and success will be your constant companion.",
	"Job searching is a puzzle; every rejection is a missing piece. Keep searching, and you'll complete the picture of your perfect career.",
	"In the job market, your skills are the currency. Invest them wisely, and you'll accumulate a wealth of opportunities.",
	"Success is not just about finding a job; it's about finding the right job that aligns with your passion and purpose.",
	"Your dream job is not just a destination; it's a journey of growth and self-discovery. Enjoy every step, and success will follow.",
	"Job hunting is a journey of self-discovery. Embrace the challenges, learn from the setbacks, and watch your dream career unfold.",
	"Your skills are the compass guiding you through the job market. Trust their direction, and you'll navigate towards the success you deserve.",
	"Every rejection is a step towards resilience. Keep stepping, and you'll find yourself closer to the job that's meant for you.",
	"In the job market, your skills are the keys to unlocking doors of opportunity. Keep searching, and you'll find the right door for your dream job.",
	"Success is not just about finding a job; it's about finding the right job that aligns with your passion and purpose.",
	"Your dream job is not just a destination; it's a journey of self-discovery and growth. Enjoy the process, and success will follow.",
	"Job searching is like planting seeds; with patience and persistence, you'll reap the harvest of a fulfilling career.",
	"Your skills are the toolkit for success. Use them wisely, and you'll build a career that stands the test of time.",
	"In the grand orchestra of job hunting, your skills are the melody. Play them with passion, and success will be your symphony.",
	"Every rejection is a bridge to resilience. Cross it, and you'll find yourself closer to the job that's meant for you.",
	"Your dream job is not just a goal; it's a journey of self-discovery and growth. Keep moving forward, and success will be your constant companion.",
	"Job searching is a puzzle; every rejection is a missing piece. Keep searching, and you'll complete the picture of your perfect career.",
	"In the job market, your skills are the currency. Invest them wisely, and you'll accumulate a wealth of opportunities.",
	"Success is not just about finding a job; it's about finding the right job that aligns with your passion and purpose.",
	"Your dream job is not just a destination; it's a journey of growth and self-discovery. Enjoy every step, and success will follow.",
	"Job hunting is a journey of self-discovery. Embrace the challenges, learn from the setbacks, and watch your dream career unfold.",
	"Your skills are the compass guiding you through the job market",
];

export default motivationalQuotes;