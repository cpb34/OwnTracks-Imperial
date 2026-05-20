import http.server, traceback, sys

class H(http.server.BaseHTTPRequestHandler):
    def do_GET(self):
        try:
            d = open('/distance-units.json').read()
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(d.encode())
        except Exception as e:
            print(traceback.format_exc(), flush=True)
            self.send_response(500)
            self.end_headers()

    def do_POST(self):
        try:
            b = self.rfile.read(int(self.headers['Content-Length']))
            open('/distance-units.json', 'w').write(b.decode())
            self.send_response(200)
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
        except Exception as e:
            print(traceback.format_exc(), flush=True)
            self.send_response(500)
            self.end_headers()

    def log_message(self, format, *args):
        print(format % args, flush=True)

http.server.HTTPServer(('0.0.0.0', 80), H).serve_forever()
