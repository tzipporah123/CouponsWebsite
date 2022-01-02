import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

public class Customer {
    public static void main(String[] args) {

        //going to the site.
        System.setProperty("webdriver.chrome.driver",
                "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chromedriver.exe");

        WebDriver driver = new ChromeDriver();
        driver.get("http://localhost:4200/login");

        //user details:
        String myEmail = "tz@gmail.com";
        String myPassword = "tz1234";

        //login
        driver.findElement(By.xpath("//input[@id='clientEmail']")).sendKeys(myEmail);
        driver.findElement(By.xpath("//input[@id='clientPassword']")).sendKeys(myPassword);
        driver.findElement(By.xpath("//input[@value='CUSTOMER']")).click();
        WebElement submitClient = driver.findElement(By.xpath("//*[contains(@type,'sub')]"));
        submitClient.click();
        submitClient.submit();

        //purchase coupons:
        driver.findElement(By.xpath(".//a[text()='coupons']")).click();

        String title = "computer";
        driver.findElement(By.xpath("//*[text()='unpurchase coupons']")).click();
        driver.findElement(By.xpath("//*[text()='unpurchase coupons']")).click();
        driver.findElement(By.xpath(".//h3[text()='" + title + "']")).click();
        driver.findElement(By.xpath("//*[text()='purchase']")).click();

        //view purchase coupons:
        driver.findElement(By.xpath(".//a[text()='coupons']")).click();
        driver.findElement(By.xpath("//*[text()='my coupons']")).click();
        driver.findElement(By.xpath("//*[text()='my coupons']")).click();

        //Edit client details:
        driver.findElement(By.xpath(".//a[text()='client']")).click();
        driver.findElement(By.xpath("//*[text()='Edit detils']")).click();

        String newName = "tziporah";
        driver.findElement(By.xpath("//input[@id='name']")).clear();
        driver.findElement(By.xpath("//input[@id='name']")).sendKeys(newName);
        driver.findElement(By.xpath("//*[contains(@type,'sub')]")).click();

        //Logout:
        driver.findElement(By.xpath("//*[text()='Logout']")).click();
    }
}
