import java.util.Scanner;

public class A_Young_Physicist {

  public static void main(String[] args) {
    Scanner scanner = new Scanner(System.in);

    int T = scanner.nextInt();
    while (T > 0) {
      int i = scanner.nextInt();
      int j = scanner.nextInt();
      int k = scanner.nextInt();

      System.out.printf("%d %d %d\n", i, j, k);
      T--;
    }

    scanner.close();
  }
}
