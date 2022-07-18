
export const AppMenus = {
    
	navbarTopRightItems: [],
	navbarTopLeftItems: [],
	navbarSideLeftItems: [
  {
    "path": "/home",
    "label": "Dashboard",
    "icon": "home",
    "iconcolor": "",
    "target": "",
    "submenu": []
  },
  {
    "path": "/aircraft",
    "label": "Aircrafts",
    "icon": "rocket_launch",
    "iconcolor": "",
    "target": "",
    "submenu": []
  },
  {
    "path": "/traffic",
    "label": "Historical Logs",
    "icon": "traffic",
    "iconcolor": "",
    "target": "",
    "submenu": []
  },
  // {
  //   "path": "/user",
  //   "label": "User",
  //   "icon": "extension",
  //   "iconcolor": "",
  //   "target": "",
  //   "submenu": []
  // }
],
	BookTableHeaderItems: [
  {
    "label": "Id",
    "align": "left",
    "sortable": false,
    "name": "id",
    "field": "id"
  },
  {
    "label": "Title",
    "align": "left",
    "sortable": false,
    "name": "title",
    "field": "title"
  },
  {
    "label": "Author",
    "align": "left",
    "sortable": false,
    "name": "author",
    "field": "author"
  },
  {
    "label": "Date Published",
    "align": "left",
    "sortable": false,
    "name": "date_published",
    "field": "date_published"
  },
  {
    "label": "Action",
    "align": "right",
    "sortable": false,
    "name": "btnactions",
    "field": ""
  }
],

RequestLogTableHeaderItems: [
  // {
  //   "label": "Id",
  //   "align": "left",
  //   "sortable": false,
  //   "name": "id",
  //   "field": "id"
  // },
  {
    "label": "Request Type",
    "align": "left",
    "sortable": false,
    "name": "request_type",
    "field": "request_type"
  },
  {
    "label": "Action",
    "align": "left",
    "sortable": false,
    "name": "requested_action",
    "field": "requested_action"
  },
  {
    "label": "Status",
    "align": "left",
    "sortable": false,
    "name": "status",
    "field": "status"
  },
  {
    "label": "Request By(Call Sign)",
    "align": "left",
    "sortable": false,
    "name": "callsign",
    "field": "callsign"
  },
  // {
  //   "label": "Action",
  //   "align": "right",
  //   "sortable": false,
  //   "name": "btnactions",
  //   "field": ""
  // }
],

AircraftHeaderItems: [
  // {
  //   "label": "Id",
  //   "align": "left",
  //   "sortable": false,
  //   "name": "id",
  //   "field": "id"
  // },
  {
    "label": "Type",
    "align": "left",
    "sortable": false,
    "name": "type",
    "field": "type"
  },
  {
    "label": "Call Sign",
    "align": "left",
    "sortable": false,
    "name": "callsign",
    "field": "callsign"
  },
  {
    "label": "State",
    "align": "left",
    "sortable": false,
    "name": "state",
    "field": "state"
  },
  {
    "label": "Action",
    "align": "right",
    "sortable": false,
    "name": "btnactions",
    "field": ""
  }
],
	UserTableHeaderItems: [
  {
    "label": "Username",
    "align": "left",
    "sortable": false,
    "name": "username",
    "field": "username"
  },
  {
    "label": "Email",
    "align": "left",
    "sortable": false,
    "name": "email",
    "field": "email"
  },
  {
    "label": "Photo",
    "align": "left",
    "sortable": false,
    "name": "photo",
    "field": "photo"
  },
  {
    "label": "Phone",
    "align": "left",
    "sortable": false,
    "name": "phone",
    "field": "phone"
  },
  {
    "label": "Action",
    "align": "right",
    "sortable": false,
    "name": "btnactions",
    "field": ""
  }
],

    exportFormats: {
        print: {
			label: 'Print',
			color: 'blue',
            icon: 'print',
            id: 'print',
            ext: '',
        },
        pdf: {
			label: 'Pdf',
			color: 'red',
            icon: 'picture_as_pdf',
            id: 'pdf',
            ext: 'pdf',
        },
        excel: {
			label: 'Excel',
			color: 'green',
            icon: 'grid_on',
            id: 'excel',
            ext: 'xlsx',
        },
        csv: {
			label: 'Csv',
			color: 'teal',
            icon: 'grid_on',
            id: 'csv',
            ext: 'csv',
        },
    },
    
}