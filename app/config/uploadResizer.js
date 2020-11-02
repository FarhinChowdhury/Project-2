// quick function used for file uploads to rename with extension
// **NOTE** we hardcode the root static folder to 'public', change line 25 if different
const fs = require('fs');
const sharp = require('sharp');
const path = require('path')
async function uploadResizer( filePath, originalName, resizeWidth=0, resizeHeight=0 ){
    const fileExt = originalName.toLowerCase().substr((originalName.lastIndexOf('.')))
        .replace('jpeg','jpg');
    const filePathWithExt = filePath+fileExt;
    resizeWidth = Math.round(resizeWidth); resizeHeight = Math.round(resizeHeight);
    const filePathFull = path.join(__dirname,filePath)
    const filePathWithExtFull = path.join(__dirname,filePathWithExt)
    if( resizeWidth>0 && resizeHeight>0 ){
        // resize if given parameters
        await sharp(filePathFull)
            .resize(resizeWidth, resizeHeight, {
                fit: sharp.fit.inside,
                withoutEnlargement: true
            })
            .toFile( filePathWithExtFull );
        console.log( `** resized ${resizeWidth}x${resizeHeight} for ${filePathWithExtFull}` );
        // remove the original file
        fs.unlinkSync(filePathFull)
    } else {
        fs.renameSync(filePathFull, filePathWithExtFull );
    }
    // everything after the public directory; ie its relative path in the browser
    // convert windows to a unix path for saves
    return filePathWithExt.replace('\\\\','/').split('public\\')[1];
}
module.exports = uploadResizer;