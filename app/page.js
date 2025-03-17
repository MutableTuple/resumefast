import EditableResume from "./_components/EditableResume";
import { getTotalDownloads } from "./_lib/data-service";

export default async function Home() {
  const downloaded_resumes = await getTotalDownloads()
  const dwnld_val = downloaded_resumes[0].value
  
  return  <EditableResume dwnld_val={dwnld_val}/>
}
