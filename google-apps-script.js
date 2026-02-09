/**
 * Google Apps Script for Church Website Form Submissions
 * 
 * SETUP INSTRUCTIONS:
 * 1. Create a new Google Sheet with two tabs/sheets:
 *    - Name the first tab "Contact Messages"
 *    - Name the second tab "Prayer Requests"
 * 
 * 2. In "Contact Messages" sheet, add these headers in Row 1:
 *    A1: Timestamp | B1: Name | C1: Email | D1: Subject | E1: Message
 * 
 * 3. In "Prayer Requests" sheet, add these headers in Row 1:
 *    A1: Timestamp | B1: Name | C1: Email | D1: Prayer Request
 * 
 * 4. Go to Extensions > Apps Script
 * 5. Replace the code with this entire file content
 * 6. Click Deploy > New deployment
 * 7. Select type: Web app
 * 8. Set "Execute as" to "Me"
 * 9. Set "Who has access" to "Anyone"
 * 10. Click Deploy and copy the Web app URL
 * 11. Add the URL as GOOGLE_SCRIPT_URL environment variable in your Vercel project
 */

var SpreadsheetApp = SpreadsheetApp;
var ContentService = ContentService;

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet;
    
    if (data.formType === "contact") {
      sheet = ss.getSheetByName("Contact Messages");
      if (!sheet) {
        sheet = ss.insertSheet("Contact Messages");
        sheet.appendRow(["Timestamp", "Name", "Email", "Subject", "Message"]);
      }
      sheet.appendRow([
        data.timestamp || new Date().toISOString(),
        data.name || "",
        data.email || "",
        data.subject || "",
        data.message || ""
      ]);
    } else if (data.formType === "prayer") {
      sheet = ss.getSheetByName("Prayer Requests");
      if (!sheet) {
        sheet = ss.insertSheet("Prayer Requests");
        sheet.appendRow(["Timestamp", "Name", "Email", "Prayer Request"]);
      }
      sheet.appendRow([
        data.timestamp || new Date().toISOString(),
        data.name || "Anonymous",
        data.email || "",
        data.prayerRequest || ""
      ]);
    }
    
    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({ status: "Church form handler is active" }))
    .setMimeType(ContentService.MimeType.JSON);
}
