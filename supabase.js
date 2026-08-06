/*=========================================
SUPABASE.JS
VERSION 3
PART 1
=========================================*/

import { createClient } from
"https://esm.sh/@supabase/supabase-js@2";

/*=========================================
CONFIG
=========================================*/

const SUPABASE_URL =
"https://bhtyestavehwaymfozxw.supabase.co";

const SUPABASE_ANON_KEY =
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJodHllc3RhdmVod2F5bWZvenh3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU4NDkwODksImV4cCI6MjEwMTQyNTA4OX0.4-8U1fe5LQVTsuFa1kgc8A1PQeBQrh_UTibZsmApPrQ";

/*=========================================
CLIENT
=========================================*/

const supabase = createClient(

SUPABASE_URL,

SUPABASE_ANON_KEY

);

/*=========================================
BUCKET
=========================================*/

const BUCKET_NAME = "selfies";

/*=========================================
CHECK CONNECTION
=========================================*/

async function checkSupabase(){

try{

const { data, error } =

await supabase.storage
.from(BUCKET_NAME)
.list("", { limit: 1 });

if(error){

console.error(error);

return false;

}

console.log("✅ Supabase Connected");

return true;

}

catch(err){

console.error(err);

return false;

}

}

/*=========================================
START
=========================================*/

checkSupabase();

/*=========================================
EXPORT
=========================================*/

export {

supabase,

BUCKET_NAME

};
