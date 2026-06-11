# Probeaufgabe - TJ Labs 

## Tech Stack
Cursor with Claude Opus 4.8, Figma, Github, Vercel

Live demo: [probeaufgabe-simon.vercel.app](https://probeaufgabe-simon.vercel.app/sign-in)

## Log
### Monday ~3h - Building the UI
At the beginning, I decided to spend 6h (max 8h) into this project because I thought that was reasonable and I also had other work to do this week. Also, I decided to take notes in Notion to make nice documentation at the end.
I started by making a Next.js app, which I hadn't done before. I used their [docs](https://nextjs.org/) to get started. Having my first Next.js app running I asked AI how to convert a Figma design into real code. The result was to use Figma's Dev Mode MCP server, which I hadn't done before either. After connecting Cursor with Figma and some back and forth with AI chat I had everything ready to get started building the UI.
First, I let AI create the sign up page (desktop view) to get an impression of how good it was. And it was really good, I was impressed. I decided to redirect to the /sign-in page because this is the homepage of this demo. Then I created the generator page and linked the buttons. After that, I prompted AI to make these two pages mobile responsive and gave it access to the designs in Figma. Once again the result was really good and I only changed a small "jump" of the box when mobile view was entered. I also had to change the eye icon (I moved it 2px down because when being hovered the icon was not visually centered and this looked off).
I created a Github repo after that, which was a mistake in my opinion because my first commit was too big. My learning is to start project with creating the repo first next time and commit more often to have a clean commit history.
Then, I started to work on the generator. I let AI present me the different approaches and compare them to get an overview of my options for this problem. I decided to go with the recommended approach and come back later to finish the generator later (Thursday).

### Thursday ~2h - Finishing the gernerator, deploy to Vercel and document results
I started to Google how to deploy an app on Vercel, which again I hadn't done before. I already had an account and only had to connect it with Github. After that it was easy to deploy my first Next.js app on Vercel.
After that, I focused on the generator task to make sure the chosen approach (Generate-and-reject) is the best for this task by comparing it once again but this time in detail to the other options (Pattern-first, Enumerate-and-pick).
At the end I wanted to make a nice documentation in a readme file and decided to let AI generate one with the notes I had taken during this task. Looking again closely at the task I decided not to take this approach because it was explicitly mentioned **not** to have AI-generated text. So I rewrote the readme from my notes and memory (and only let AI correct the grammar and spelling, which I hope is fine).

## Resume
Overall I really liked the task and I was shocked by how good the transition (and setup) between Cursor and Figma is.
The generator was a challenging task because there were multiple approaches and I had to decide which one to pick. Of course with the help of AI you can get the approaches quicker but you still have to decide which one to take, why and how it works! In general, I think (especially in frontend development) development will be more like this in the future: have a problem, think about it, ask AI and get a good overview of the options, decide which approach to take and why, let AI build, review and understand carefully, launch.

Cheers

Simon

## Hot fix
It wouldn't be a correct "lunch" without a hot fix right? To be honest but it amerress me to admit but I haven't tested enough and found a bug in my code where the first number is bigger than the second. I fixed it and pushed again. So let me add another point to the list above before the launch: TESTING!
