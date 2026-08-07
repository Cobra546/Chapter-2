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
/*=================================================
 SUPABASE.JS
 VERSION 3
 PART 2
 SELFIE UPLOAD
=================================================*/

/*=========================
Upload Selfie
=========================*/

async function uploadSelfieToSupabase(imageBlob){

    try{

        if(!imageBlob){

            console.error("❌ No image found.");

            return null;

        }

        /* Unique filename */

        const fileName =
            `selfie_${Date.now()}.jpg`;

        /* Upload */

        const { data, error } =
            await supabase.storage
            .from(BUCKET_NAME)
            .upload(
                fileName,
                imageBlob,
                {
                    contentType:"image/jpeg",
                    upsert:false
                }
            );

        if(error){

            console.error(
                "❌ Upload failed:",
                error
            );

            return null;

        }

        /* Get public URL */

        const { data: publicData } =
            supabase.storage
            .from(BUCKET_NAME)
            .getPublicUrl(data.path);

        const imageUrl =
            publicData.publicUrl;

        /* Save locally */

        localStorage.setItem(
            "latestSelfie",
            imageUrl
        );

        console.log(
            "✅ Selfie uploaded:",
            imageUrl
        );

        return imageUrl;

    }

    catch(error){

        console.error(
            "❌ Supabase error:",
            error
        );

        return null;

    }

}


/*=========================
Get Latest Selfie
=========================*/

function getLatestSelfie(){

    return localStorage.getItem(
        "latestSelfie"
    );

}


/*=========================
Show Selfie
=========================*/

function showLatestSelfie(){

    const imageUrl =
        getLatestSelfie();

    const selfieImage =
        document.getElementById(
            "selfieImage"
        );

    const futureSelfie =
        document.getElementById(
            "futureSelfie"
        );

    if(!imageUrl){

        console.log(
            "ℹ️ No selfie saved yet."
        );

        return;

    }

    /* Selfie Polaroid */

    if(selfieImage){

        selfieImage.src =
            imageUrl;

    }

    /* Future Star */

    if(futureSelfie){

        futureSelfie.src =
            imageUrl;

        futureSelfie.style.display =
            "block";

    }

}


/*=========================
Upload + Show
=========================*/

async function saveSelfie(imageBlob){

    const imageUrl =
        await uploadSelfieToSupabase(
            imageBlob
        );

    if(!imageUrl){

        return false;

    }

    showLatestSelfie();

    return true;

}


/*=========================
Load Saved Selfie
=========================*/

document.addEventListener(
    "DOMContentLoaded",
    ()=>{

        showLatestSelfie();

    }
);
