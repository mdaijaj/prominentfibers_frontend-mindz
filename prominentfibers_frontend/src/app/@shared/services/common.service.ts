import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
declare var $: any;

@Injectable({
    providedIn: 'root'
})

export class CommonService {

    constructor(private toast: ToastrService) { }

    checkForValidFile(event: any, isPdf = false, isBoth = true) {
        let isValidExtension = true;
        if (!event.currentTarget.files || event.currentTarget.files.length == 0) {
            return isValidExtension;
        }
        let file = event.currentTarget.files[0];
        var filePath = file.name;

        let allowedFileSize = 500;
        let sizeLbl = "500 KB";
        var allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;
        if (isPdf) {
            allowedFileSize = 5000;
            sizeLbl = "3 MB";
            allowedExtensions = /(\.pdf)$/i;
        }
        if (isBoth) {
            allowedExtensions = /(\.jpg|\.jpeg|\.png|\.pdf)$/i;
            allowedFileSize = 5000;
            sizeLbl = "3 MB";
        }

        if (!allowedExtensions.exec(filePath)) {
            isValidExtension = false;
        }

        var fileSize = file.size / 1024;
        if (fileSize > allowedFileSize) {
            this.toast.error(`File cannot be greater than ${sizeLbl}`);
        }

        if (!isValidExtension) {
            this.toast.error('Please select valid file');
            $(event.currentTarget).val("");
        }
        return isValidExtension;
    }

}
