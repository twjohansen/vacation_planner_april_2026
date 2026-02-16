var map = L.map('route-map', { scrollWheelZoom: false }).setView([47.5, 7.5], 6);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    maxZoom: 18
}).addTo(map);

// Main route stops [lat, lng, label, day]
var stops = [
    [50.8503, 4.3517,  'Brussels',                    'Start / End'],
    [48.9566, 4.3631,  'Châlons-en-Champagne',        'Day 1 lunch'],
    [47.1847, 5.2342,  'Château de Longecourt',        'Night 1'],
    [47.3220, 5.0415,  'Dijon',                        'Day 2 morning'],
    [45.7640, 4.8357,  'Lyon',                         'Night 2'],
    [44.9847, 7.6408,  'Trofarello (Villa Salzea)',      'Night 3'],
    [44.4949, 11.3426, 'Bologna',                      'Nights 4–7'],
    [45.9936, 9.2572,  'Swiss Border Area',            'Night 8'],
    [47.0502, 8.3093,  'Switzerland (TBD)',             'Night 9']
];

// Day trips from Bologna
var dayTrips = [
    [45.4408, 12.3155, 'Venice',   'Day 5 – train day trip'],
    [44.4184, 12.2035, 'Ravenna',  'Day 6 – day trip']
];

// Custom numbered marker
function createMarker(lat, lng, number, label, detail, color) {
    var icon = L.divIcon({
        className: '',
        html: '<div style="background:' + color + ';color:#fff;width:26px;height:26px;' +
              'border-radius:50%;display:flex;align-items:center;justify-content:center;' +
              'font-size:12px;font-weight:bold;font-family:Georgia,serif;' +
              'border:2px solid #fff;box-shadow:0 1px 4px rgba(0,0,0,0.3);">' +
              number + '</div>',
        iconSize: [26, 26],
        iconAnchor: [13, 13]
    });
    return L.marker([lat, lng], { icon: icon })
        .bindPopup('<strong>' + label + '</strong><br><span style="color:#888;font-size:12px;">' + detail + '</span>');
}

// Add main route markers
stops.forEach(function(s, i) {
    createMarker(s[0], s[1], i + 1, s[2], s[3], '#c9a961').addTo(map);
});

// Add day trip markers (diamond style)
dayTrips.forEach(function(d) {
    var icon = L.divIcon({
        className: '',
        html: '<div style="background:#6a9ec9;color:#fff;width:22px;height:22px;' +
              'border-radius:3px;display:flex;align-items:center;justify-content:center;' +
              'font-size:10px;font-weight:bold;font-family:Georgia,serif;' +
              'border:2px solid #fff;box-shadow:0 1px 4px rgba(0,0,0,0.3);' +
              'transform:rotate(45deg);"><span style="transform:rotate(-45deg);">&#9830;</span></div>',
        iconSize: [22, 22],
        iconAnchor: [11, 11]
    });
    L.marker([d[0], d[1]], { icon: icon })
        .bindPopup('<strong>' + d[2] + '</strong><br><span style="color:#888;font-size:12px;">' + d[3] + '</span>')
        .addTo(map);
});

// Main route polyline (including return to Brussels)
var routeCoords = stops.map(function(s) { return [s[0], s[1]]; });
routeCoords.push([50.8503, 4.3517]); // close the loop back to Brussels
L.polyline(routeCoords, {
    color: '#c9a961',
    weight: 3,
    opacity: 0.8,
    dashArray: '8, 6'
}).addTo(map);

// Day trip lines from Bologna
dayTrips.forEach(function(d) {
    L.polyline([[44.4949, 11.3426], [d[0], d[1]]], {
        color: '#6a9ec9',
        weight: 2,
        opacity: 0.6,
        dashArray: '4, 6'
    }).addTo(map);
});

// Fit map to show all points
var allPoints = stops.map(function(s) { return [s[0], s[1]]; });
dayTrips.forEach(function(d) { allPoints.push([d[0], d[1]]); });
map.fitBounds(allPoints, { padding: [30, 30] });
