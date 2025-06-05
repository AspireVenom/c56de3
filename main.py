import requests

url = "https://apply-to-avantos.dev-sandbox.workload.avantos-ai.net"
headers = {
    "Content-Type": "application/json",
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36",
}
payload = {"email": "douglitandres@gmail.com"}

response = requests.post(url, json=payload, headers=headers)

print(response.status_code)
print(response.text)
