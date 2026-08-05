/*=====================================
OUR STORY — CHAPTER TWO
SUPABASE.JS
=====================================*/

// =====================================
// SUPABASE CONFIG
// =====================================

const SUPABASE_URL =
"https://bhtyestavehwaymfozxw.supabase.co";

const SUPABASE_KEY =
"sb_publishable_VpUhQZY8bczeIYv-oo8mLQ_YHPTjm7r";

const supabaseClient =
supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);

// =====================================
// SAVE SELFIE
// =====================================

async function saveSelfie(imageData){

    const { data, error } =
    await supabaseClient
    .from("selfies")
    .insert([{
        image: imageData
    }]);

    if(error){

        console.error("❌ Selfie Error:", error);

    }else{

        console.log("✅ Selfie Saved");

    }

}

// =====================================
// SAVE MESSAGE
// =====================================

async function saveMessage(message){

    const { data, error } =
    await supabaseClient
    .from("messages")
    .insert([{
        message: message
    }]);

    if(error){

        console.error("❌ Message Error:", error);

    }else{

        console.log("✅ Message Saved");

    }

}

// =====================================
// SAVE RATING
// =====================================

async function saveRating(rating){

    const { data, error } =
    await supabaseClient
    .from("ratings")
    .insert([{
        rating: rating
    }]);

    if(error){

        console.error("❌ Rating Error:", error);

    }else{

        console.log("✅ Rating Saved");

    }

}

// =====================================
// CHECK CONNECTION
// =====================================

async function checkConnection(){

    const { error } =
    await supabaseClient
    .from("messages")
    .select("*")
    .limit(1);

    if(error){

        console.error("❌ Supabase Not Connected");

    }else{

        console.log("✅ Supabase Connected Successfully");

    }

}

checkConnection();
