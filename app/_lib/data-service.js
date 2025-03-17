import { supabase } from "./supabase";

export async function getUserResumeByID(id='e451f166-e4ab-44d9-bb01-f4e9c6ac8ad5') {
  const { data, error } = await supabase
  .from('resumes')
  .select('*').eq('id',id)

  if (error) console.log(error);
  return data;
}

export async function getAllResume() {
  const { data, error } = await supabase
  .from('resumes')
  .select('*')

  if (error) console.log(error);
  return data;
}

export async function getAllAds() {
  const { data, error } = await supabase
  .from('ads')
  .select('*')

  if (error) console.log(error);
  return data;
}

export async function getTotalDownloads() {
  const { data, error } = await supabase
  .from('resume_downloaded')
  .select('value').eq('id','fa95afaa-1f06-4e31-99b5-43e7bf2074e1')

  if (error) console.log(error);
  return data;
}

